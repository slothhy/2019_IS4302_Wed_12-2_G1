/**
 * Logic file for Parcel Delivery Transactions
 */

/**
 * Create a new parcel
 * @param {org.parceldelivery.model.CreateParcel} CreateParcel - the create parcel transaction
 * @transaction
 */
async function createParcel(createParcel) {
   return getAssetRegistry('org.parceldelivery.model.Parcel').then(function(result) {
      var factory = getFactory();
      var newParcel = factory.newResource('org.parceldelivery.model', 'Parcel', createParcel.parcel.trackingID);
      newParcel.itemDescription = createParcel.parcel.itemDescription;
      newParcel.parcelWeight = createParcel.parcel.parcelWeight;
      newParcel.recipientAddress = createParcel.parcel.recipientAddress;
      newParcel.invoice = createParcel.parcel.invoice;
      newParcel.location = createParcel.parcel.location;
      newParcel.returnInformation = createParcel.parcel.returnInformation;
      newParcel.logisticCompany = createParcel.parcel.logisticCompany;
      return result.add(newParcel);
  });
}

/**
 * Update an existing parcel
 * @param {org.parceldelivery.model.UpdateParcel} updateParcel - the update parcel transaction
 * @transaction
 */
async function updateParcel(updateParcel) {
    updateParcel.parcel.logisticCompany = updateParcel.logisticCompany;
  	updateParcel.parcel.status = updateParcel.status;
  	updateParcel.parcel.location = updateParcel.location;
    const assetRegistry = await getAssetRegistry('org.parceldelivery.model.Parcel');
    await assetRegistry.update(updateParcel.parcel);
}

/**
 * Answers a query made by customs
 * @param {org.parceldelivery.model.QueryByCustom} queryByCustom - the query by custom transaction
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
    customsParcel.trackingID = results[0].trackingID;
    customsParcel.itemDescription = results[0].itemDescription;
    customsParcel.parcelWeight = results[0].parcelWeight;
    customsParcel.recipientAddress = results[0].recipientAddress;
    customsParcel.invoice = results[0].invoice;
    customsParcel.logisticcompany = results[0].logisticCompany;

    const event = getFactory().newEvent('org.parceldelivery.model', 'CustomQueryEvent');
    event.customsView = customsParcel;
    emit(event);

  	return customsParcel;
}
