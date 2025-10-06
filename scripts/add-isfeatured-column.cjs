const Database = require('better-sqlite3');
const path = require('path');

try {
  const dbPath = path.resolve(process.cwd(), 'pistac.db');
  console.log('DB path:', dbPath);
  const db = new Database(dbPath);

  const cols = db.prepare("PRAGMA table_info('documents')").all();
  const has = cols.some(c => c.name === 'is_featured');
  if (has) {
    console.log('is_featured already exists');
    process.exit(0);
  }

  console.log('Adding is_featured column...');
  db.prepare("ALTER TABLE documents ADD COLUMN is_featured INTEGER DEFAULT 0").run();
  console.log('Column added');
} catch (err) {
  console.error('Migration error:', err && err.stack ? err.stack : err);
  process.exit(1);
}
