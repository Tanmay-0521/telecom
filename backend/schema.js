const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Get MongoDB URI from environment variables
const mongoURI = process.env.mongoURL;

// Mongoose connection setup with error handling
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define the Mongoose schema for your collection
const ChannelSchema = new mongoose.Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  time: { type: Date, default: Date.now },
  acVolt: { type: Number, required: true },
  dcVolt: { type: Number, required: true },
  rect1Curr: { type: Number, required: true },
  rect2Curr: { type: Number, required: true },
  rect3Curr: { type: Number, required: true },
  lowDC: { type: Number, required: true },
  highAC: { type: Number, required: true },
  lowDC46: { type: Number, required: true },
  highDC: { type: Number, required: true },
  mainsFail: { type: Number, required: true },
  lowAC: { type: Number, required: true },
  wLowAC: { type: Number, required: true },
  wHighAC: { type: Number, required: true },
  wCriticalLoadSPDB: { type: Number, required: true },
  wHighDC54V: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create a Mongoose model based on the schema
const Channel = mongoose.model('Channel', ChannelSchema);

// Example route to test the connection and schema
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB');
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
