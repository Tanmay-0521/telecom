const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 4000; // Or any other port you prefer

// MongoDB connection setup
const mongoURI = 'mongodb+srv://Tan0521:0521Tanmay@cluster0.bdc9agc.mongodb.net/';
mongoose.connect(mongoURI);

const ChannelSchema = new mongoose.Schema({
  id: Number,
  apiKey: String,
  name: String,
  temperature: Number,
  humidity: Number,
  time: Date,
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

// API endpoint to fetch real-time data
app.get('/api/real', async (req, res) => {
  try {
    const twoSecondsAgo = new Date(Date.now() - 2000);
    const lastentries = await Channel.find({ time: { $gte: twoSecondsAgo } })
      .sort({ time: -1 })
      .limit(1)
      .lean();

    if (lastentries.length === 0) {
      res.status(404).json({ error: 'No data found in the last 20 seconds.' });
    } else {
        // console.log(lastTwentySecondsEntries);
      res.json(lastentries);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
});
// API endpoint to fetch last 20 seconds data
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


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
