const mongoose = require('mongoose');

const { Schema } = mongoose;

const ParcelsSchema = new Schema({
  trackingID: String,
  retailer: String,
  txHistory: [String]
});

mongoose.model('Parcels', ParcelsSchema);
