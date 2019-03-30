const mongoose = require('mongoose');
const router = require('express').Router();
const Parcels = mongoose.model('Parcels');

router.post('/input', (req, res, next) => {
  const { body: { parcel } } = req;

  const newParcel = new Parcels(parcel);

  return newParcel.save()
    .then(() => {
      res.status(200).json({ 
        trackingID: parcel.trackingID
      })
    }, (err) => {
      if (err.code === 11000)
        res.status(401).json({
          message: "Unable to create parcel"
        })
    });
})

module.exports = router;
