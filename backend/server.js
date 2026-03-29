/* global process */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { getNews } from './newsService.js';

const app = express();
app.use(cors());

// Fetch news endpoint
app.get('/api/news', async (req, res) => {
  try {
    const { country, category, q, persona } = req.query;
    const articles = await getNews({ country, category, q, persona });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
