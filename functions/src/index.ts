
import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firestore-graph-goty-default-rtdb.firebaseio.com"
});

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({
   message: "Hello world from firebase!!"
  });
});
