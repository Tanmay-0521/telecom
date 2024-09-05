const mongoose = require('mongoose');
require('dotenv').config();

// Replace this with your MongoDB connection URI
const mongoURI = process.env.mongoURL;
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

async function fetchLastTwentySecondsData() {
  try {
    // Calculate the timestamp for 20 seconds ago
    const twentySecondsAgo = new Date(Date.now() - 20000);

    // Fetch entries with 'time' field greater than or equal to twentySecondsAgo
    const lastTwentySecondsEntries = await Channel.find({ time: { $gte: twentySecondsAgo } })
      .sort({ time: -1 }).limit(10) // Sort by time in descending order
      .lean();

    if (lastTwentySecondsEntries.length === 0) {
      console.log('No data found in the last 20 seconds.');
    } else {
      console.log('Data from the last 20 seconds:');
      lastTwentySecondsEntries.forEach(entry => {
        console.log(`Field: ${entry.temperature}, Time: ${entry.time}`);
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

fetchLastTwentySecondsData();
