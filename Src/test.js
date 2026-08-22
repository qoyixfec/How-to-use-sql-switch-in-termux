// THIS FILE IS ONLY FOR TESTING
// CREATED BY AI - IF YOU GET AN ERROR, JUST FIX IT YOURSELF
// THE MAIN src/app.js WORKS FINE
// THIS IS BASICALLY A BETA TEST

import initSqlJs from 'sql.js';
import fs from 'fs';

// Initialize SQLite database
const SQL = await initSqlJs();
const db = new SQL.Database();

// Create settings table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`);

// Function to save key-value pair
function save(key, value) {
  db.exec(
    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
    [key, JSON.stringify(value)]
  );
}

// Function to load value by key
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

// Test 1: Save and load
save('test1', 'hello');
const result1 = load('test1');
console.log(result1 === 'hello' ? 'Test 1: success' : 'Test 1: error');

// Test 2: Overwrite existing key
save('test1', 'world');
const result2 = load('test1');
console.log(result2 === 'world' ? 'Test 2: success' : 'Test 2: error');

// Test 3: Load non-existent key (should return null)
const result3 = load('nonexistent');
console.log(result3 === null ? 'Test 3: success' : 'Test 3: error');

// Test 4: Save and load JSON object
save('config', { port: 3000, debug: true });
const result4 = load('config');
console.log(result4.port === 3000 && result4.debug === true ? 'Test 4: success' : 'Test 4: error');

// Export database to file
const data = db.export();
fs.writeFileSync('./data.db', data);

// Close database connection
db.close();
