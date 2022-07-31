// import { auth } from '@/lib/firebaseConfig-admin';
// import { deleteComment } from '@/lib/db-admin';

// export default async (req, res) => {
//     try{
//         const { uid } = await auth.verifyIdToken(req.headers.token);
//         const { queryId } = req.headers.queryId
//         const { commentToDelete } = req.headers.commentToDelete

//         await deleteComment(uid, queryId, commentToDelete);

//         res.status(200).json({success: 'Comment Deleted'});

//     } catch(error) {
//         res.status(400).json({ error })
//     }
// }