import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// initialize the Cloud Firestore SDK
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const data = [];

export const healthCheck = functions.https.onRequest((request, response) => {
  response.send("Hi, Hello! The Crystals API is healthy.");
});

// handler for /crystals endpoint
export const getCrystals = functions.https.onRequest((request, response) => {
  db.collection('crystals').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push(doc.data());
        console.log(doc.id, '=>', doc.data());
      });
      response.send(data);
    })
    .catch((err) => {
      console.log('Error getting Firestore data', err);
    });
});

// handler for /crystals/<crystal> endpoint
export const getCrystal = functions.https.onRequest((request, response) => {
  // splitting & popping because request.url is '/pyrite' when running locally,
  // but is '/crystals/pyrite' in production b/c of my hosting/url config
  const crystal = request.url.split('/').pop();

  db.collection('crystals').doc(crystal).get()
    .then((doc) => {
      if (!doc.exists) {
        response.send("We don't seem to have data on that crystal");
      } else {
        response.send(doc.data());
      }
    })
    .catch((err) => {
      console.log('Error getting Firestore data', err);
    });
});
