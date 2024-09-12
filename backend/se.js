
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT2 ; // Or any other port you prefer
const mongoURI = process.env.mongoURL;

mongoose.connect(mongoURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const ChannelSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  time: Date,
  acVolt: Number,
  dcVolt: Number,
  rect1Curr: Number,
  rect2Curr: Number,
  rect3Curr: Number,
  lowDC: Number,
  highAC: Number,
  lowDC46: Number,
  highDC: Number,
  mainsFail: Number,
  lowAC: Number,
  wLowAC: Number,
  wHighAC: Number,
  wCriticalLoadSPDB: Number,
  wHighDC54V: Number,
  timestamp: Date,
});

const Channel = mongoose.model('Channel', ChannelSchema);

const fetchRealTimeData = async () => {
  try {
    const latestData = await Channel.findOne().sort({ timestamp: -1 }).lean();
    if (!latestData) {
      throw new Error('No data found');
    }
    console.log(latestData);
    return { temperature: latestData.temperature, humidity: latestData.humidity };
  } catch (error) {
    console.error('Error fetching real-time data:', error.message);
    return null;
  }
};

app.get('/api/real', async (req, res) => {
  try {
    const twoSecondsAgo = new Date(Date.now() - 2000);
    const lastEntries = await Channel.find({ time: { $gte: twoSecondsAgo } })
      .sort({ time: -1 })
      .limit(1)
      .lean();

    if (lastEntries.length === 0) {
      res.status(404).json({ error: 'No data found in the last 20 seconds.' });
    } else {
      res.json(lastEntries);
    }
  } catch (error) {
    console.error('Error fetching real-time data:', error.message);
    res.status(500).json({ error: 'Failed to fetch real-time data.' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const twentySecondsAgo = new Date(Date.now() - 20000);
    const lastTwentySecondsEntries = await Channel.find({ time: { $gte: twentySecondsAgo } })
      .sort({ time: -1 })
      .limit(10)
      .lean();

    if (lastTwentySecondsEntries.length === 0) {
      res.status(404).json({ error: 'No data found in the last 20 seconds.' });
    } else {
      console.log(lastTwentySecondsEntries);
      res.json(lastTwentySecondsEntries);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

