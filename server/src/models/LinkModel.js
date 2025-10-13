import { getDb } from '../db.js';

export const LinkModel = {
  getByMap(mapId) {
    const db = getDb();
    return db.prepare('SELECT * FROM links WHERE map_id = ? ORDER BY id ASC').all(mapId);
  },
  getById(id) {
    const db = getDb();
    return db.prepare('SELECT * FROM links WHERE id = ?').get(id);
  },
  create({ map_id, source_node_id, target_node_id, relationship_type = 'related' }) {
    const db = getDb();
    const stmt = db.prepare(
      'INSERT INTO links (map_id, source_node_id, target_node_id, relationship_type) VALUES (?, ?, ?, ?)'
    );
    const info = stmt.run(map_id, source_node_id, target_node_id, relationship_type);
    return this.getById(info.lastInsertRowid);
  },
  delete(id) {
    const db = getDb();
    const stmt = db.prepare('DELETE FROM links WHERE id = ?');
    return stmt.run(id);
  }
};
