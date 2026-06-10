import express from 'express';
import SiteStats from '../models/SiteStats.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const getOrCreateStats = async (initialViews = 0) => {
  let stats = await SiteStats.findOne();
  if (!stats) {
    stats = await SiteStats.create({ views: initialViews });
  }
  return stats;
};

router.get('/', async (req, res) => {
  try {
    const stats = await getOrCreateStats(0);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/visit', async (req, res) => {
  try {
    const stats = await getOrCreateStats(0);
    stats.views += 1;
    await stats.save();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    const stats = await getOrCreateStats(0);
    const nextViews = Number(req.body.views);

    if (!Number.isInteger(nextViews) || nextViews < 0) {
      return res.status(400).json({ message: 'Views must be a non-negative integer' });
    }

    stats.views = nextViews;
    await stats.save();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
