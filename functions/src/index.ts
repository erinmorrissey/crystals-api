import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// initialize the Cloud Firestore SDK
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const data = [];

export const healthCheck = functions.https.onRequest((request, response) => {
  response.send("Hi, Hello! The Crystals API is healthy.");
});

export const crystals = functions.https.onRequest((request, response) => {
  db.collection('crystals').get()
    .then((snapshot) => {
      console.log('Snapshot: ', snapshot);
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
