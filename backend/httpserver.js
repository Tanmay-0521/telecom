const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3500;

// Replace 'your-database-name' with your actual MongoDB database name
const mongoURI = 'mongodb+srv://Tan0521:0521Tanmay@cluster0.bdc9agc.mongodb.net/telecom';

// Mongoose connection setup
mongoose.connect(mongoURI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const ChannelSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  time: Date,
  Acvolt: Number,
  Dcvolt: Number,
  Rect1curr: Number,
  Rect2curr: Number,
  Rect3curr: Number,
  Lowdc: Number,
  Highac: Number,
  Lowdc46: Number,
  Highdc: Number,
  Mainsfail: Number,
  Lowac: Number,
  Wlowac: Number,
  Whighac: Number,
  Wcriticalloadspdb: Number,
  Whighdc54v: Number,
  timestamp: Date,
}, { collection: 'esp32' }); // Specify the custom collection name here
const Channel = mongoose.model('Channel', ChannelSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/data', async (req, res) => {
  console.log('Received request body:', req.body); // Log the request body

  try {
    const {
      temperature,
      humidity,
      time,
      Acvolt,
      Dcvolt,
      Rect1curr,
      Rect2curr,
      Rect3curr,
      Lowdc,
      Highac,
      Lowdc46,
      Highdc,
      Mainsfail,
      Lowac,
      Wlowac,
      Whighac,
      Wcriticalloadspdb,
      Whighdc54v,
    } = req.body;

    // Ensure numeric values are parsed correctly
    const parsedTemperature = parseFloat(temperature);
    const parsedHumidity = parseFloat(humidity);
    const parsedAcvolt = parseFloat(Acvolt);
    const parsedDcvolt = parseFloat(Dcvolt);
    const parsedRect1curr = parseFloat(Rect1curr);
    const parsedRect2curr = parseFloat(Rect2curr);
    const parsedRect3curr = parseFloat(Rect3curr);
    const parsedLowdc = parseFloat(Lowdc);
    const parsedHighac = parseFloat(Highac);
    const parsedLowdc46 = parseFloat(Lowdc46);
    const parsedHighdc = parseFloat(Highdc);
    const parsedMainsfail = parseFloat(Mainsfail);
    const parsedLowac = parseFloat(Lowac);
    const parsedWlowac = parseFloat(Wlowac);
    const parsedWhighac = parseFloat(Whighac);
    const parsedWcriticalloadspdb = parseFloat(Wcriticalloadspdb);
    const parsedWhighdc54v = parseFloat(Whighdc54v);
    const timeDiff = 5.5 * 60 * 60 * 1000;
    const localTime = new Date(req.body.time);
    // Create a new Date object adjusted to UTC
    const utcTime = new Date(localTime.getTime() + timeDiff);
    
    // Format the UTC time in MongoDB format (YYYY-MM-DDTHH:mm:ss.sssZ)
    const formattedTime = utcTime.toISOString();
    
    const newEntry = new Channel({
      temperature: isNaN(parsedTemperature) ? 0 : parsedTemperature,
      humidity: isNaN(parsedHumidity) ? 0 : parsedHumidity,
      time: formattedTime,
      Acvolt: isNaN(parsedAcvolt) ? 0 : parsedAcvolt,
      Dcvolt: isNaN(parsedDcvolt) ? 0 : parsedDcvolt,
      Rect1curr: isNaN(parsedRect1curr) ? 0 : parsedRect1curr,
      Rect2curr: isNaN(parsedRect2curr) ? 0 : parsedRect2curr,
      Rect3curr: isNaN(parsedRect3curr) ? 0 : parsedRect3curr,
      Lowdc: isNaN(parsedLowdc) ? 0 : parsedLowdc,
      Highac: isNaN(parsedHighac) ? 0 : parsedHighac,
      Lowdc46: isNaN(parsedLowdc46) ? 0 : parsedLowdc46,
      Highdc: isNaN(parsedHighdc) ? 0 : parsedHighdc,
      Mainsfail: isNaN(parsedMainsfail) ? 0 : parsedMainsfail,
      Lowac: isNaN(parsedLowac) ? 0 : parsedLowac,
      Wlowac: isNaN(parsedWlowac) ? 0 : parsedWlowac,
      Whighac: isNaN(parsedWhighac) ? 0 : parsedWhighac,
      Wcriticalloadspdb: isNaN(parsedWcriticalloadspdb) ? 0 : parsedWcriticalloadspdb,
      Whighdc54v: isNaN(parsedWhighdc54v) ? 0 : parsedWhighdc54v,
      timestamp: new Date(),
    });

    await newEntry.save();
    console.log('Data saved to MongoDB:', newEntry.toObject());
    // console.log(newEntry.time);
    // console.log(time);
    res.status(200).send('Data received and saved successfully');
  } catch (error) {
    console.error('Error saving data to MongoDB:', error.message);
    res.status(500).send('Error saving data to MongoDB');
  }
});

//merged both server
// app.get('/api/real', async (req, res) => {
//   try {
//     const twoSecondsAgo = new Date(Date.now() - 2000);
//     const lastEntries = await Channel.find({ time: { $gte: twoSecondsAgo } })
//       .sort({ time: -1 })
//       .limit(1)
//       .lean();

//     if (lastEntries.length === 0) {
//       res.status(404).json({ error: 'No data found in the last 20 seconds.' });
//     } else {
//       res.json(lastEntries);
//     }
//   } catch (error) {
//     console.error('Error fetching real-time data:', error.message);
//     res.status(500).json({ error: 'Failed to fetch real-time data.' });
//   }
// });

// app.get('/api/data', async (req, res) => {
//   try {
//     const twentySecondsAgo = new Date(Date.now() - 20000);
//     const lastTwentySecondsEntries = await Channel.find({ time: { $gte: twentySecondsAgo } })
//       .sort({ time: -1 })
//       .limit(10)
//       .lean();

//     if (lastTwentySecondsEntries.length === 0) {
//       res.status(404).json({ error: 'No data found in the last 20 seconds.' });
//     } else {
//       console.log(lastTwentySecondsEntries);
//       res.json(lastTwentySecondsEntries);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     res.status(500).json({ error: 'Failed to fetch data.' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
