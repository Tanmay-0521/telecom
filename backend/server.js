const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Define API endpoints for each channel
const temperatureHumidityEndpoint = 'http://localhost:3000/api/channel/:id/temperature-humidity';

const channels = [
  { id: 2409420, apiKey: '08WYKGTDWC8VUP7O', name: 'Channel 1' }, //esp apla dht for testing
  { id: 2497882, apiKey: 'Q89B2FGGOT2DOI7E', name: 'Channel 2' },
  { id: 2497884, apiKey: '2FILQTHVTFQX4PFD', name: 'Channel 3' }
];

// Function to fetch and display test data for each channel
async function fetchAndDisplayTestData() {
  try {
    const allData = [];
    for (const channel of channels) {
      const response = await axios.get(`https://api.thingspeak.com/channels/${channel.id}/feeds.json?api_key=${channel.apiKey}&results=2`);

      // Extract relevant data from the ThingSpeak API response
      const { feeds } = response.data;
      const data = feeds.map(feed => ({
        timestamp: feed.created_at,
        temperature: Number(feed.field1).toFixed(2),
        humidity: Number(feed.field2).toFixed(2) // Adjust this based on the field you want to display
      }));

      allData.push({ channelName: channel.name, data });
    }

    console.log(allData);
    return allData;
  } catch (error) {
    console.error('Error fetching data from ThingSpeak:', error.message);
    throw error; // Re-throw the error to handle it outside this function
  }
}

// Route handling
app.get('/', async (req, res) => {
  try {
    const testData = await fetchAndDisplayTestData();
    res.json(testData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
