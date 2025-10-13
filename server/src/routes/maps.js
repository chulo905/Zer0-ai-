import { Router } from 'express';
import { mapService } from '../services/mapService.js';
import { nodeService } from '../services/nodeService.js';
import { linkService } from '../services/linkService.js';

const router = Router();

router.get('/maps', (_req, res) => {
  res.json(mapService.listMaps());
});

router.post('/maps', (req, res) => {
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title required' });
  const created = mapService.createMap({ title });
  res.status(201).json(created);
});

router.put('/maps/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: 'title required' });
  const updated = mapService.updateMap(id, { title });
  res.json(updated);
});

router.delete('/maps/:id', (req, res) => {
  const id = Number(req.params.id);
  mapService.deleteMap(id);
  res.status(204).end();
});

router.get('/maps/:mapId/full', (req, res) => {
  const mapId = Number(req.params.mapId);
  const map = mapService.getMap(mapId);
  if (!map) return res.status(404).json({ error: 'map not found' });
  const nodes = nodeService.listNodes(mapId);
  const links = linkService.listLinks(mapId);
  res.json({ map, nodes, links });
});

export default router;
