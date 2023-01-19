
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as express from "express";
import * as cors from "cors";

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firestore-graph-goty-default-rtdb.firebaseio.com",
});

const db = admin.firestore();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// # CLOUD FUNCTIONS #
export const getGoty = functions.https.onRequest( async (request, response) => {
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const games = docsSnap.docs.map( (doc) => doc.data() ); // Recover the information of each register

  response.json( games );
});

// Express service for get and post the votes
const app = express();
app.use( cors({origin: true}));

app.get("/goty", async (req, res) => { // Deploy in firestore database
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const games = docsSnap.docs.map( (doc) => doc.data() ); // Recover the information of each register

  res.json( games );
});

app.post("/goty/:id", async (req, res) => {
  const id = req.params.id;
  const gameRef = db.collection("goty").doc(id);
  const gameSnap = await gameRef.get();

  if ( !gameSnap.exists ) {
    res.status(404).json({
      ok: false,
      msg: `There isnt a game with that ID = ${id}`,
    });
  } else {
    const game = gameSnap.data() || {votes: 0};

    gameRef.update({
      votes: game.votes + 1,
    });

    res.json({

      ok: true,
      msg: `Thanks to vote to ${ game.name }`,

    });
  }
});

export const api = functions.https.onRequest( app );
