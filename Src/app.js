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

try {
  save('theme', 'dark');
  save('lang', 'en');
  
  const theme = load('theme');
  
  if (theme === 'dark') {
    console.log('success');
  } else {
    console.log('error');
  }
} catch (err) {
  console.log('error');
}

const data = db.export();
fs.writeFileSync('./data.db', data);
db.close();
