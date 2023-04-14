const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema for your data
const emissionSchema = new Schema({
  food: String,
  pointOfOrigin: String,
  transportDistance: Number,
  weight: Number,
  units: String,
  emissionValuesTTW: Number,
  emissionValuesWTW: Number,
  co2ePerKg: Number,
});

// Create a Mongoose model from the schema
const Emission = mongoose.model('Emission', emissionSchema);

// Express route for handling the file upload
app.post('/upload', (req, res) => {
  const file = req.files.csv;

  // Read the CSV file using csv-parser
  fs.createReadStream(file.tempFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Create a new Emission object from each row of data
      const emission = new Emission({
        food: row.Food,
        pointOfOrigin: row['Point of Origin'],
        transportDistance: parseFloat(row['Transport Distance (km)']),
        weight: parseFloat(row.Weight),
        units: row.Units,
        emissionValuesTTW: parseFloat(row['Emission Values kg (CO2e TTW)']),
        emissionValuesWTW: parseFloat(row['Emission Values kg (CO2e WTW)']),
        co2ePerKg: parseFloat(row['CO2e per kg']),
      });

      // Save the Emission object to the database
      emission.save()
        .then(() => {
          console.log('Data saved successfully');
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      res.redirect('/');
    });
});
