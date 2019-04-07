# IS4302 Wed 12-2 Group 1 Parcel Delivery Project

Project Group Members:<a name="group"></a>

* Chan Jun Yuan
* Lai Qi Wei
* Oh Han Yi
* Toh Yun Qi Cheryl

# Table of Contents
1. [Introduction](Introduction)
2. [Parcel Delivery Network Setup](#ParcelDeliveryNetworkSetup)
3. [MongoDB Setup](#MongoDBSetup)
4. [Backend Setup](#BackendSetup)
5. [Frontend Setup](#FrontendSetup)


## Introduction
This project aims to solve accountability, traceability and transparency issues
of the cross-border parcel delivery industry by providing a blockchain
infrastructure which stores parcels' information.
`MongoDB` is used for the database and `React` is used in the frontend.

## Parcel Delivery Network Setup Guide <a name="ParcelDeliveryNetworkSetup"></a>
This section shows how our group set up Parcel Delivery Network Project.

1. Set up Hyperledger composer by following the instructions from
`https://github.com/suenchunhui/easy-hyperledger-composer.`

2. Clone a copy of our project files using the command:
    
    
        git clone https://github.com/slothhy/2019_IS4302_Wed_12-2_G1.git

3. After cloning the directory, import the BNA into the playground and create
new identities. For example, you can create 5 logisticsCompany `log1` `log2` to `log5`,
and Custom `c1`. Next, start the rest server for the 6 identities created by entering the commands:


    npm run start_rest-server log1@parceldeliverynetwork 9001
    npm run start_rest-server log2@parceldeliverynetwork 9002
    npm run start_rest-server log3@parceldeliverynetwork 9003
    npm run start_rest-server log4@parceldeliverynetwork 9004
    npm run start_rest-server log5@parceldeliverynetwork 9005
    npm run start_rest-server c1@parceldeliverynetwork 8001


  ## MongoDB Setup <a name="MongoDBSetup"></a>
Next, install `MongoDB` for Ubuntu 16.04 by entering the following commands:

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4

    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

    sudo apt install mongodb

**Note:** Refer to `https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/` for more information regarding MongoDB setup.

**Note:** MongoDB runs on port 27017 by default.

After installing `MongoDB`, run the setup script to complete the setup.
The script contains a list of preconfigured usernames and passwords mainly which are mainly `log1`, `log2`, `log3`, `log4`, `log5` and `c1`, and also user and password of the user required to access the database. Run the setup script with the command:

    mongo < setup.js


  ## Backend Setup <a name="BackendSetup"></a>

From the base directory of the downloaded file, enter the following commands
to set up the backend:

    cd blockchain_backend
    vim .env
Add the following line:

    DB_PASSWORD="mongodb_dbpassword"
**Note:** the password must match the one inside `setup.js`.

Configure the IP address and ports of mongoDB accordingly in the `app.js` file:

    vim app.js
Then, execute the following commands to install and start the backend:

    npm install
    npm start

## Frontend Setup <a name="FrontendSetup"></a>
Locate the frontend directory and write appropriate configurations for the participants. Configure the ports in `config.js` to be the same as the ones in the Hyperledger rest server:

    cd ../blockchain_frontend
    vim config.js

Then, execute the following commands to install and start the frontend:

    npm install
    npm start
