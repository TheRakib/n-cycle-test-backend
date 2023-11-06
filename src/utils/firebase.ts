import type { ServiceAccount } from 'firebase-admin'
import firebaseAdmin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount = {
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
} as ServiceAccount

export const admin = () => {
  if (firebaseAdmin.apps.length === 0) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    })
  }
  return firebaseAdmin
}
