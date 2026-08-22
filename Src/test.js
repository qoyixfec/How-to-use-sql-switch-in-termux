// THIS FILE IS ONLY FOR TESTING
// CREATED BY AI - IF YOU GET AN ERROR, JUST FIX IT YOURSELF
// THE MAIN src/app.js WORKS FINE
// THIS IS BASICALLY A BETA TEST

import { getDb, saveDb, closeDb } from './db.js';
import { isValidKey } from './log.js';

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
  await save('test1', 'hello');
  const result1 = await load('test1');
  console.log(result1 === 'hello' ? 'Test 1: success' : 'Test 1: error');

  await save('test1', 'world');
  const result2 = await load('test1');
  console.log(result2 === 'world' ? 'Test 2: success' : 'Test 2: error');

  const result3 = await load('nonexistent');
  console.log(result3 === null ? 'Test 3: success' : 'Test 3: error');

  await save('config', { port: 3000, debug: true });
  const result4 = await load('config');
  console.log(result4.port === 3000 && result4.debug === true ? 'Test 4: success' : 'Test 4: error');

  try {
    await save('', 'test');
    console.log('Test 5: error');
  } catch {
    console.log('Test 5: success');
  }

  closeDb();
} catch (err) {
  console.log('Test failed:', err.message);
}
