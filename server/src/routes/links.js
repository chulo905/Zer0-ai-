import { Router } from 'express';
import { linkService } from '../services/linkService.js';

const router = Router();

router.get('/maps/:mapId/links', (req, res) => {
  const mapId = Number(req.params.mapId);
  res.json(linkService.listLinks(mapId));
});

router.post('/maps/:mapId/links', (req, res) => {
  const map_id = Number(req.params.mapId);
  const { source_node_id, target_node_id, relationship_type = 'related' } = req.body || {};
  if (!source_node_id || !target_node_id) {
    return res.status(400).json({ error: 'source_node_id and target_node_id required' });
  }
  const created = linkService.createLink({ map_id, source_node_id, target_node_id, relationship_type });
  res.status(201).json(created);
});

router.delete('/links/:id', (req, res) => {
  const id = Number(req.params.id);
  linkService.deleteLink(id);
  res.status(204).end();
});

export default router;
