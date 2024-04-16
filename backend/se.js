const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 4000; // Or any other port you prefer

// MongoDB connection setup
const mongoURI = 'mongodb+srv://Tan0521:0521Tanmay@cluster0.bdc9agc.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

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
        // console.log(lastTwentySecondsEntries);
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
