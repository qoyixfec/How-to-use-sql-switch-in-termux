// THIS FILE IS ONLY FOR TESTING
// CREATED BY AI USING MY SRC - IF YOU GET AN ERROR, JUST FIX IT YOURSELF
// THE MAIN src/app.js WORKS FINE
// THIS IS BASICALLY A BETA TEST THAT COMBINE ALL THE FILES

import initSqlJs from 'sql.js';
import fs from 'fs';

const SQL = await initSqlJs();
const db = new SQL.Database();

db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`);

function save(key, value) {
  db.exec(
    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
    [key, JSON.stringify(value)]
  );
}

function load(key) {
  const results = db.exec(
    'SELECT value FROM settings WHERE key = ?',
    [key]
  );
  if (results.length > 0 && results[0].values.length > 0) {
    return JSON.parse(results[0].values[0][0]);
  }
  return null;
}

function isValidKey(key) {
  return typeof key === 'string' && key.trim().length > 0;
}

save('test1', 'hello');
const result1 = load('test1');
console.log(result1 === 'hello' ? 'Test 1: success' : 'Test 1: error');

save('test1', 'world');
const result2 = load('test1');
console.log(result2 === 'world' ? 'Test 2: success' : 'Test 2: error');

const result3 = load('nonexistent');
console.log(result3 === null ? 'Test 3: success' : 'Test 3: error');

save('config', { port: 3000, debug: true });
const result4 = load('config');
console.log(result4.port === 3000 && result4.debug === true ? 'Test 4: success' : 'Test 4: error');

try {
  save('', 'test');
  console.log('Test 5: error');
} catch {
  console.log('Test 5: success');
}

const data = db.export();
fs.writeFileSync('./data.db', data);
db.close();
