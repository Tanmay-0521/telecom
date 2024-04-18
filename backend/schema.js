
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3500;

// Replace 'your-database-name' with your actual MongoDB database name
const mongoURI = 'mongodb+srv://Tan0521:0521Tanmay@cluster0.bdc9agc.mongodb.net/test';

// Mongoose connection setup
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.post('/data', async (req, res) => {
//   try {
//     const {
//       temperature,
//       humidity,
//       time,
//       acVolt,
//       dcVolt,
//       rect1Curr,
//       rect2Curr,
//       rect3Curr,
//       lowDC,
//       highAC,
//       lowDC46,
//       highDC,
//       mainsFail,
//       lowAC,
//       wLowAC,
//       wHighAC,
//       wCriticalLoadSPDB,
//       wHighDC54V,
//     } = req.body;

//     const newEntry = new Channel({
//       temperature,
//       humidity,
//       time: new Date(),
//       acVolt,
//       dcVolt,
//       rect1Curr,
//       rect2Curr,
//       rect3Curr,
//       lowDC,
//       highAC,
//       lowDC46,
//       highDC,
//       mainsFail,
//       lowAC,
//       wLowAC,
//       wHighAC,
//       wCriticalLoadSPDB,
//       wHighDC54V,
//       timestamp: new Date(),
//     });

//     await newEntry.save();
//     // console.log(ChannelSchema.obj); // Log the schema definition

//     console.log('Data saved to MongoDB:', newEntry.toObject());

//     res.status(200).send('Data received and saved successfully');
//   } catch (error) {
//     console.error('Error saving data to MongoDB:', error.message);
//     res.status(500).send('Error saving data to MongoDB');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
