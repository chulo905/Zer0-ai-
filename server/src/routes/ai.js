import { Router } from 'express';
import { aiService } from '../services/aiService.js';

const router = Router();

router.post('/ai/expandNode', async (req, res, next) => {
  try {
    const { title, content = '' } = req.body || {};
    if (!title) return res.status(400).json({ error: 'title required' });
    const ideas = await aiService.expandNode({ title, content });
    res.json({ ideas });
  } catch (e) { next(e); }
});

router.post('/ai/summarizeNode', async (req, res, next) => {
  try {
    const { title, content = '' } = req.body || {};
    if (!title && !content) return res.status(400).json({ error: 'title or content required' });
    const summary = await aiService.summarizeNode({ title, content });
    res.json({ summary });
  } catch (e) { next(e); }
});

router.post('/ai/suggestRelatedNodes', async (req, res, next) => {
  try {
    const { title, content = '' } = req.body || {};
    if (!title && !content) return res.status(400).json({ error: 'title or content required' });
    const suggestions = await aiService.suggestRelatedNodes({ title, content });
    res.json({ suggestions });
  } catch (e) { next(e); }
});

router.post('/ai/textToMap', async (req, res, next) => {
  try {
    const { text = '' } = req.body || {};
    if (!text) return res.status(400).json({ error: 'text required' });
    const result = await aiService.textToMap({ text });
    res.json(result);
  } catch (e) { next(e); }
});

export default router;
