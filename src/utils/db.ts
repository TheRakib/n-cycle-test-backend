import { getFirestore } from 'firebase-admin/firestore'
import { z } from 'zod'
import { admin } from './firebase.js'

const userDataSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

type UserData = z.infer<typeof userDataSchema>

const userCollectionRef = () => getFirestore().collection('users')

export const saveUserNameAndEmail = async (
  userId: string,
  userData: UserData,
) => {
  const validatedData = userDataSchema.parse(userData)
  return userCollectionRef()
    .doc(userId)
    .set(
      {
        ...validatedData,
      },
      {
        merge: true,
      },
    )
}

export const getUserNameAndEmail = async (userId: string) => {
  const resp = await userCollectionRef().doc(userId).get()
  const data = resp.data()
  return data as UserData
}
