const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3500;

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

// Enable body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle POST requests and save data to MongoDB
app.post('/data', async (req, res) => {
  try {
    const { temperature, humidity, time } = req.body;
    const newEntry = new Channel({
      temperature: temperature,
      humidity: humidity,
      time: new Date(time),
      timestamp: new Date(),
    });
    await newEntry.save();
    console.log('Data saved to MongoDB:', newEntry);
    res.status(200).send('Data received and saved successfully');
  } catch (error) {
    console.error('Error saving data to MongoDB:', error.message);
    res.status(500).send('Error saving data to MongoDB');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
