
// const express = require('express');
// const axios = require('axios');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Replace with your MongoDB connection string
// const mongoURI = 'mongodb+srv://Tan0521:0521Tanmay@cluster0.bdc9agc.mongodb.net/';

// // Mongoose connection setup
// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log('MongoDB connected');
//     // Call the function to fetch and store data initially
//     fetchDataAndStore();
//     // Set interval to fetch and store data every 15 seconds
//     setInterval(fetchDataAndStore, 15000);
//   })
//   .catch(err => console.error('Error connecting to MongoDB:', err));


// // Channel schema for storing channel data in the database
// const ChannelSchema = new mongoose.Schema({
//   id: Number,
//   apiKey: String,
//   name: String,
//   temperature: Number,
//   humidity: Number,
//   time: Date,
//   timestamp:Date,
// });

// const Channel = mongoose.model('Channel', ChannelSchema);

// // Function to fetch and store data for a channel
// async function fetchAndStoreData(channelId, apiKey) {
//   try {
//     const response = await axios.get(`https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=1`);
//     const { feeds } = response.data;
//     if (feeds.length === 0) {
//       throw new Error('No data found');
//     }

//     const feed = feeds[0];
//     const newEntry = new Channel({
//       id: channelId,
//       apiKey: apiKey,
//       temperature: !isNaN(parseFloat(feed.field1)) ? parseFloat(feed.field1) : null,
//       humidity: !isNaN(parseFloat(feed.field2)) ? parseFloat(feed.field2) : null,
//       time: !isNaN((feed.field3)) ? (feed.field3) : null,
//       timestamp :new Date().toISOString(),
//     });

//     await newEntry.save();
//     console.log('Data saved for channel:', channelId);
//     return newEntry;
//   } catch (error) {
//     console.error('Error fetching and storing data:', error.message);
//     throw error; // Re-throw the error for handling at the route level
//   }
// }

// // Function to fetch and store data for all channels
// async function fetchDataAndStore() {
//   try {
//     // Replace the channel IDs below with your actual channel IDs
//     const channelIds = [2409420, /* Add more channel IDs here if needed */];
    
//     for (const channelId of channelIds) {
//       await fetchAndStoreData(channelId, '08WYKGTDWC8VUP7O'); // Pass Read API Key here
//     }
    
//     console.log('Data upload completed');
//   } catch (error) {
//     console.error('Error fetching and storing data for all channels:', error.message);
//   }
// }

// // Function to fetch latest data for a channel
// async function fetchLatestData(channelId) {
//   try {
//     const latestEntries = await Channel.find({ id: channelId }).sort({ time: -1 }).limit(10);
    
//     // Extract labels and values from latest entries
//     const labels = latestEntries.map(entry => entry.timestamp );
//     const values = latestEntries.map(entry => entry.temperature);
    
//     return { labels, values };
//   } catch (error) {
//     console.error('Error fetching latest data:', error.message);
//     throw error; // Re-throw the error for handling at the route level
//   }
// }

// // Route to fetch latest data for a channel
// app.get('/channels/:id/latest', async (req, res) => {
//   const channelId = req.params.id;
//   try {
//     const latestData = await fetchLatestData(channelId);
//     res.json(latestData);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch latest data' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://Tan0521:0521Tanmay@cluster0.bdc9agc.mongodb.net/';

// Mongoose connection setup
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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

// Function to fetch data from ThingSpeak API and store in MongoDB
async function fetchDataAndStore(channelId, apiKey) {
  try {
    const response = await axios.get(`https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${apiKey}&results=1`);
    const { feeds } = response.data;
    if (feeds.length === 0) {
      throw new Error('No data found');
    }

    const feed = feeds[0];
    const newEntry = new Channel({
      id: channelId,
      apiKey: apiKey,
      temperature: !isNaN(parseFloat(feed.field1)) ? parseFloat(feed.field1) : null,
      humidity: !isNaN(parseFloat(feed.field2)) ? parseFloat(feed.field2) : null,
      time: !isNaN((feed.field3)) ? new Date(feed.field3) : null,
    });
    

    await newEntry.save();
    console.log('Data saved for channel:', channelId);
    console.log('Temperature :', feed.field1);
    console.log('Humidity :', feed.field2);
    console.log('Time :', feed.field3);

    return newEntry;
  } catch (error) {
    console.error('Error fetching and storing data:', error.message);
    throw error;
  }
}

// Function to fetch and store data for all channels
async function fetchDataAndStoreAllChannels(channelIds, apiKey) {
  try {
    for (const channelId of channelIds) {
      await fetchDataAndStore(channelId, apiKey);
    }

    // console.log('Data upload completed for all channels');
  } catch (error) {
    console.error('Error fetching and storing data for all channels:', error.message);
  }
}

// Function to fetch latest data from MongoDB
async function fetchLatestData(channelId) {
  try {
    // Assuming your MongoDB schema has fields like id, time, and temperature
    const latestEntry = await Channel.findOne({ id: channelId }).sort({ time: -1 }).limit(10);
    
    if (!latestEntry) {
      console.log('No data found for the provided channel ID.');
      return { labels: [], values: [] };
    }

    const labels = [latestEntry.time];
    const values = [latestEntry.temperature];
    console.log(labels);
    console.log(values);
    
    return { labels, values };
  } catch (error) {
    console.error('Error fetching latest data:', error.message);
    throw error;
  }
}


// Route to fetch latest data from MongoDB
app.get('/channels/:id/g', async (req, res) => {
  const channelId = req.params.id;
  try {
    const latestData = await fetchLatestData(channelId);
    res.json(latestData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to trigger fetching and storing data from ThingSpeak API for a specific channel
app.get('/channels/:id/fetch', async (req, res) => {
  const channelId = req.params.id;
  const apiKey = '08WYKGTDWC8VUP7O'; // Replace with your ThingSpeak read API key
  try {
    const newData = await fetchDataAndStore(channelId, apiKey);
    res.json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to periodically fetch and store data from ThingSpeak API for all channels
async function fetchDataPeriodically() {
  const channelIds = [2409420, /* Add more channel IDs here if needed */];
  const apiKey = '08WYKGTDWC8VUP7O'; // Replace with your ThingSpeak read API key
  try {
    await fetchDataAndStoreAllChannels(channelIds, apiKey);
    console.log('Data upload completed for all channels');
  } catch (error) {
    console.error('Error fetching and storing data periodically:', error.message);
  }
}

// Set interval to fetch and store data every 15 seconds
setInterval(fetchDataPeriodically, 15000);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
