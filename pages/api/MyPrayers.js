import { auth } from '@/lib/firebaseConfig-admin'
import { getMyPrayers, deleteAComment } from '@/lib/db-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token)
    const { myPrayers } = await getMyPrayers(uid)

    res.status(200).json(myPrayers)
  } catch (error) {
    res.status(400).json({ error })
  }
}