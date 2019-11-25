import * as functions from 'firebase-functions';


import * as admin from 'firebase-admin';

admin.initializeApp();

exports.Notifications = functions.firestore
  .document('requests/{status}')
  .onCreate(async event =>{

    // const data = event.data();

    let payload ={
      notification: {
      title: 'New e-Load request recieved.',
      body: `You've new e-Load Request, please open PayPak application to check.`,
      image: ''
      }
    }
    const db = admin.firestore();
    const devicesRef = db.collection('devices').where('userId','==','6EFnWvgPVudIlvTvAuifiZxMKUo2');
    const devices = await devicesRef.get();
    let tokens: Array<any> = [];

    // send a notification to each device token
    devices.forEach(result => {
    const token = result.data().token;

    tokens.push( token )
    });

    return admin.messaging().sendToDevice(tokens, payload) 
  });

  
  
  exports.Notifications2 = functions.firestore
  .document('requests/{status}')
  .onUpdate(async event =>{

    const data = event.after.data();

    if(data.status === 'pending'){
        // to make compiler happy :)
        return 0;
    }
    else if (data.status === 'rejected'){
        return 0;
    }
    else{

        let payload ={
            notification: {
            title: 'Update on your Mobile e-Load',
            body: `Your Request for Mobile e-Load of AED ${data.amount} to ${data.number} has been confirmed.`,
            image: ''
            }
          }
          const db = admin.firestore();
          const devicesRef = db.collection('devices').where('userId','==',data.uid);
          const devices = await devicesRef.get();
          let tokens: Array<any> = [];
      
          // send a notification to each device token
          devices.forEach(result => {
          const token = result.data().token;
      
          tokens.push( token )
          });
      
          return admin.messaging().sendToDevice(tokens, payload) 
    }

  });

  exports.Notifications3 = functions.firestore
  .document('topup/{status}')
  .onUpdate(async event =>{

    const data = event.after.data();

    if(data.status === 'pending'){
        return 0;
    }
    else if (data.status === 'rejected'){
        return 0;
    }
    else {
        let payload ={
            notification: {
            title: 'Update on your Top-Up',
            body: `Your Request for Top-Up of AED ${data.amount} has been confirmed.`,
            image: ''
            }
          }
          const db = admin.firestore();
          const devicesRef = db.collection('devices').where('userId','==',data.uid);
          const devices = await devicesRef.get();
          let tokens: Array<any> = [];
      
          // send a notification to each device token
          devices.forEach(result => {
          const token = result.data().token;
      
          tokens.push( token )
          });
      
          return admin.messaging().sendToDevice(tokens, payload) 
    }


  });

  exports.Notifications4 = functions.firestore
  .document('topup/{status}')
  .onCreate(async event =>{

    const data = event.data();

    let payload ={
      notification: {
      title: `New Top-Up Request`,
      body: `${data.name} has requested you for a Top-Up of AED ${data.amount}.`,
      image: ''
      }
    }
    const db = admin.firestore();
    const devicesRef = db.collection('devices').where('userId','==','6EFnWvgPVudIlvTvAuifiZxMKUo2');
    const devices = await devicesRef.get();
    let tokens: Array<any> = [];

    // send a notification to each device token
    devices.forEach(result => {
    const token = result.data().token;

    tokens.push( token )
    });

    return admin.messaging().sendToDevice(tokens, payload) 
  });