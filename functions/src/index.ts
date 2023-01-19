
import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firestore-graph-goty-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// # CLOUD FUNCTIONS #

export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({
   message: "Hello world from firebase!!"
  });
});

export const getGoty = functions.https.onRequest( async(request, response) => {

  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();
  const games = docsSnap.docs.map( doc => doc.data() ); // Recover the information of each register

  response.json( games ); 

});
