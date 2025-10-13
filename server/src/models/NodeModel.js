import { getDb } from '../db.js';

export const NodeModel = {
  getByMap(mapId) {
    const db = getDb();
    return db.prepare('SELECT * FROM nodes WHERE map_id = ? ORDER BY id ASC').all(mapId);
  },
  getById(id) {
    const db = getDb();
    return db.prepare('SELECT * FROM nodes WHERE id = ?').get(id);
  },
  create({ map_id, title, content = '', x_position = 0, y_position = 0 }) {
    const db = getDb();
    const stmt = db.prepare(
      'INSERT INTO nodes (map_id, title, content, x_position, y_position) VALUES (?, ?, ?, ?, ?)'
    );
    const info = stmt.run(map_id, title, content, x_position, y_position);
    return this.getById(info.lastInsertRowid);
  },
  update(id, data) {
    const db = getDb();
    const now = new Date().toISOString();

    const current = this.getById(id);
    if (!current) return null;

    const updated = {
      title: data.title ?? current.title,
      content: data.content ?? current.content,
      x_position: data.x_position ?? current.x_position,
      y_position: data.y_position ?? current.y_position
    };

    const stmt = db.prepare(
      'UPDATE nodes SET title = ?, content = ?, x_position = ?, y_position = ?, updated_at = ? WHERE id = ?'
    );
    stmt.run(
      updated.title,
      updated.content,
      updated.x_position,
      updated.y_position,
      now,
      id
    );
    return this.getById(id);
  },
  delete(id) {
    const db = getDb();
    const stmt = db.prepare('DELETE FROM nodes WHERE id = ?');
    return stmt.run(id);
  }
};
