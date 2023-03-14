//Import admin firebase
import admin from 'firebase-admin';
import { getApps as getAppsAdmin } from 'firebase-admin/app';

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_GOOGLE_CREDENTIAL as string
);
// console.log(serviceAccount);

if (!getAppsAdmin().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminDb = admin.firestore();
