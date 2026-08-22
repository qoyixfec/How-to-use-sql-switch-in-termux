// This shit is the main file, don't fuck it.

import { getDb, saveDb, closeDb } from './db.js';
import { isValidKey, log } from './log.js';

async function save(key, value) {
  if (!isValidKey(key)) {
    throw new Error('Invalid key');
  }
  const db = await getDb();
  db.exec(
    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
    [key, JSON.stringify(value)]
  );
  saveDb();
}

async function load(key) {
  if (!isValidKey(key)) {
    return null;
  }
  const db = await getDb();
  const results = db.exec(
    'SELECT value FROM settings WHERE key = ?',
    [key]
  );
  if (results.length > 0 && results[0].values.length > 0) {
    return JSON.parse(results[0].values[0][0]);
  }
  return null;
}

try {
  await save('db', 'connected');
  await save('status', 'online');

  const dbStatus = await load('db');

  if (dbStatus === 'connected') {
    log('Database ready');
    console.log('success');
  } else {
    console.log('error');
  }
} catch (err) {
  console.log('error');
} finally {
  closeDb();
}
