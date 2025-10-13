import { Router } from 'express';
import { nodeService } from '../services/nodeService.js';

const router = Router();

router.get('/maps/:mapId/nodes', (req, res) => {
  const mapId = Number(req.params.mapId);
  res.json(nodeService.listNodes(mapId));
});

router.post('/maps/:mapId/nodes', (req, res) => {
  const map_id = Number(req.params.mapId);
  const { title, content = '', x_position = 0, y_position = 0 } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title required' });
  const created = nodeService.createNode({ map_id, title, content, x_position, y_position });
  res.status(201).json(created);
});

router.put('/nodes/:id', (req, res) => {
  const id = Number(req.params.id);
  const updated = nodeService.updateNode(id, req.body || {});
  if (!updated) return res.status(404).json({ error: 'node not found' });
  res.json(updated);
});

router.delete('/nodes/:id', (req, res) => {
  const id = Number(req.params.id);
  nodeService.deleteNode(id);
  res.status(204).end();
});

export default router;
