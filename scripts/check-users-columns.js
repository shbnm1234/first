const Database = require('better-sqlite3');
const path = require('path');

try {
  const dbPath = path.join(process.cwd(), 'pistac.db');
  console.log('Checking DB at:', dbPath);
  const db = new Database(dbPath);
  const pragma = db.prepare("PRAGMA table_info('users')").all();
  console.log('users table columns:', pragma);
  db.close();
} catch (err) {
  console.error('Error reading DB:', err);
  process.exit(1);
}
