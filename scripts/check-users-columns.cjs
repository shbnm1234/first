const Database = require('better-sqlite3');
const path = require('path');

try {
  const dbPath = path.resolve(process.cwd(), 'pistac.db');
  console.log('Checking DB file:', dbPath);
  const db = new Database(dbPath);
  const rows = db.prepare("PRAGMA table_info('users')").all();
  console.log('users table columns:');
  console.log(rows);
} catch (err) {
  console.error('Error checking users columns:', err && err.stack ? err.stack : err);
  process.exit(1);
}
