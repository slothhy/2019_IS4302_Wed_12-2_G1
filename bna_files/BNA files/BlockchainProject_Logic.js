/**
 * Logic file for Parcel Delivery Transactions
 */

/**
 * Create a new parcel
 * @param {org.parceldelivery.model.CreateParcel} CreateParcel - the create parcel transaction
 * @transaction
 */
async function CreateParcel(CreateParcel) {
   return getAssetRegistry('org.parceldelivery.model.Parcel').then(function(result) {
      var factory = getFactory();
      var newParcel = factory.newResource('org.parceldelivery.model', 'Parcel', createParcel.parcel.trackingID);
      newParcel.itemDescription = createParcel.parcel.itemDescription;
      newParcel.parcelWeight = createParcel.parcel.parcelWeight;
      newParcel.recipientAddress = createParcel.parcel.recipientAddress;
      newParcel.invoice = createParcel.parcel.invoice;
      newParcel.location = createParcel.parcel.location;
      newParcel.retailer = createParcel.parcel.retailer;
      newParcel.logisticCompany = createParcel.parcel.logisticCompany;
      return result.add(newParcel);
  });
}

/**
 * Update an existing parcel
 * @param {org.parceldelivery.model.UpdateParcel} UpdateParcel - the update parcel transaction
 * @transaction
 */
async function UpdateParcel(UpdateParcel) {
	return getAssetRegistry('org.parceldelivery.model.Parcel')
      .then(function (assetRegistry) {
    	return assetRegistry.get(UpdateParcel.parcel.trackingID);
  	})
      .then(function (oldParcel) {
        UpdateParcel.parcel.status = UpdateParcel.status;
        UpdateParcel.parcel.location = UpdateParcel.location;
      	
  		if (UpdateParcel.hasChangedLC == true){
   			UpdateParcel.parcel.logisticCompany = UpdateParcel.logisticCompany;
   		}
      
      	const event = getFactory().newEvent('org.parceldelivery.model', 'UpdateParcelEvent');
   		event.logisticCompany = UpdateParcel.logisticCompany; 
      	event.status = UpdateParcel.status;
        event.location = UpdateParcel.location;
        event.conditionOfParcel = UpdateParcel.conditionOfParcel;
   		emit(event);
    	
        return getAssetRegistry('org.parceldelivery.model.Parcel').then(function (assetRegistry2) {
            assetRegistry2.update(UpdateParcel.parcel);
        });
    });
  
  	//const assetRegistry = await getAssetRegistry('org.parceldelivery.model.Parcel');
  	//return assetRegistry.get(UpdateParcel.trackingID);
  	
}

/**
 * Answers a query made by customs
 * @param {org.parceldelivery.model.QueryByCustom} QueryByCustom - the query by custom transaction
  * @returns {org.parceldelivery.model.CustomsParcel} CustomsParcel
 * @transaction
 */
async function QueryByCustom(QueryByCustom) {
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
    customsParcel.retailer = results[0].retailer;
    customsParcel.logisticCompany = results[0].logisticCompany;

   	const event = getFactory().newEvent('org.parceldelivery.model', 'customQueryEvent');
   	event.customsview = customsParcel; 
   	emit(event);
    
  	console.log(customsParcel);
    return customsParcel;
}
