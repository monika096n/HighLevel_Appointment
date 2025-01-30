
const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.resolve(__dirname, "../serviceAccountKey.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountPath),
    databaseURL : "https://calenderly-4d3c7.firebaseio.com"
  });
}

const db = admin.firestore();
module.exports = db;