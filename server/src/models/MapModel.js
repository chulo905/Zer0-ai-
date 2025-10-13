import { getDb } from '../db.js';

export const MapModel = {
  getAll() {
    const db = getDb();
    return db.prepare('SELECT * FROM maps ORDER BY updated_at DESC').all();
  },
  getById(id) {
    const db = getDb();
    return db.prepare('SELECT * FROM maps WHERE id = ?').get(id);
  },
  create({ title }) {
    const db = getDb();
    const stmt = db.prepare('INSERT INTO maps (title) VALUES (?)');
    const info = stmt.run(title);
    return this.getById(info.lastInsertRowid);
  },
  update(id, { title }) {
    const db = getDb();
    const now = new Date().toISOString();
    const stmt = db.prepare('UPDATE maps SET title = ?, updated_at = ? WHERE id = ?');
    stmt.run(title, now, id);
    return this.getById(id);
  },
  delete(id) {
    const db = getDb();
    const stmt = db.prepare('DELETE FROM maps WHERE id = ?');
    return stmt.run(id);
  }
};
