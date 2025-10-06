const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'pistac.db');
const db = new Database(dbPath);

try {
  const pragma = db.prepare("PRAGMA table_info('users')").all();
  const hasEmail = pragma.some(c => c.name === 'email');

  if (hasEmail) {
    console.log('Column email already exists.');
  } else {
    console.log('Adding email column to users table...');
    db.prepare("ALTER TABLE users ADD COLUMN email TEXT").run();
    console.log('email column added.');
  }
} catch (err) {
  console.error('Failed to add email column:', err);
  process.exit(1);
} finally {
  db.close();
}
