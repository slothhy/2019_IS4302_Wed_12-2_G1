/**
 * Logic file for Parcel Delivery Transactions
 */

/**
 * Create a new parcel
 * @param {org.parceldelivery.model.createParcel} createParcel - the create parcel transaction
 * @transaction
 */
async function createParcel(createParcel) { 
   return getAssetRegistry('org.parceldelivery.model.Parcel').then(function(result) {
        var factory = getFactory();
        var newParcel = factory.newResource('org.parceldelivery.model', 'Parcel', createParcel.parcel.trackingID);
      newParcel.itemDescription = createParcel.parcel.itemDescription;
      newParcel.parcelWeight = createParcel.parcel.parcelWeight;
      newParcel.recipientAddress = createParcel.parcel.recipientAddress;
      newParcel.status = createParcel.parcel.status;
      newParcel.additionalInfo = createParcel.parcel.additonalInfo;
      newParcel.conditionOfParcel = createParcel.parcel.conditionOfParcel;
      newParcel.retailer = createParcel.parcel.retailer;
      newParcel.logisticcompany = createParcel.parcel.logisticcompany;
      return result.add(newParcel);
  });
}

/**
 * Update an existing parcel
 * @param {org.parceldelivery.model.updateParcel} updateParcel - the update parcel transaction
 * @transaction
 */
async function updateParcel(updateParcel) {
    updateParcel.parcel.logisticcompany = updateParcel.logisticcompany;
    updateParcel.parcel.conditionOfParcel = updateParcel.conditionOfParcel;
    const assetRegistry = await getAssetRegistry('org.parceldelivery.model.Parcel');
    await assetRegistry.update(updateParcel.parcel);
}

/**
 * Answers a query made by customs
 * @param {org.parceldelivery.model.queryByCustom} queryByCustom - the query by custom transaction
  * @returns {org.parceldelivery.model.CustomsParcel} CustomsParcel
 * @transaction
 */
async function queryByCustom(queryByCustom) {
    let q = buildQuery('SELECT org.parceldelivery.model.Parcel WHERE (trackingID == _$desiredTrackingID)');
    let results = await query(q, { desiredTrackingID: queryByCustom.trackingID });
    if (!results) {
        throw new Error('No parcel with that tracking id!');
    }
    
    let factory = getFactory();
    var customsParcel = factory.newConcept('org.parceldelivery.model', 'CustomsView');
    customsParcel.trackingID = results.trackingID;
    customsParcel.itemDescription = results.itemDescription;
    customsParcel.parcelWeight = results.parcelWeight;
    customsParcel.recipientAddress = results.recipientAddress;
    customsParcel.invoice = results.invoice;
    customsParcel.retailer = results.retailer;
    customsParcel.logisticcompany = results.logisticcompany;
    
    console.log(customsParcel);
    return customsParcel;
}

/**
 * Answers a query made by public
 * @param {org.parceldelivery.model.queryByPublic} queryByPublic - the query by public transaction
 * @returns {org.parceldelivery.model.PublicParcel} PublicParcel
 * @transaction
 */
async function queryByPublic(queryByPublic) {
    let q = buildQuery('SELECT org.parceldelivery.model.Parcel WHERE (trackingID == _$desiredTrackingID)');
    let results = await query(q, { desiredTrackingID: queryByPublic.trackingID });
    if (!results) {
        throw new Error('No parcel with that tracking id!');
    }
  
    let factory = getFactory();
    var publicParcel = factory.newConcept('org.parceldelivery.model', 'PublicParcel');
    for (let n = 0; n < results.length; n++) {
        let parcel = results[n];
        publicParcel.status = parcel.status;
    }
    console.log(publicParcel);
    return publicParcel;
}