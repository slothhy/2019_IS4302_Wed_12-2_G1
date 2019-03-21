/**
 * Logic file for Parcel Delivery Transactions
 */

/**
 * Create a new parcel
 * @param  {org.parceldelivery.model.createParcel} createParcel - the create parcel transaction
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
     	newParcel.retailer = createParcel.parcel.retailer();
     	newParcel.logisticcompany = createParcel.parcel.logisticcompany;
   		return result.add(newParcel);
	});
}