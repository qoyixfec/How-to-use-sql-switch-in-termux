// DATABASE CONNECTION AND MANAGEMENT
// This file handles all database operations

import initSqlJs from 'sql.js';
import fs from 'fs';

let dbInstance = null;

export async function getDb() {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();
  let db;

  if (fs.existsSync('./data.db')) {
    const buffer = fs.readFileSync('./data.db');
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  dbInstance = db;
  return db;
}

export function saveDb() {
  if (!dbInstance) return;
  const data = dbInstance.export();
  fs.writeFileSync('./data.db', data);
}

export function closeDb() {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}
