const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({ origin: true });

// admin init
admin.initializeApp();

// db init
const db = admin.firestore;

exports.validateUserJWTToken = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authorizationHeader.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        const docRef = db.collection("users").doc()
        return res.status(200).json({ success: true, user: decodedToken });
      }
    } catch (error) {
      console.log(error);
      return res.status(402).json({ error: "Unauthorized" });
    }
  });
});
