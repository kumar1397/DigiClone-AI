// firebase.js
import { initializeApp, credential as _credential, firestore } from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

initializeApp({
    credential: _credential.cert(
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40digiclone-ai.iam.gserviceaccount.com",
        universe_domain: "googleapis.com"
    ),
});

const db = firestore();

export default db;
