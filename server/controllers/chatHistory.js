import admin from 'firebase-admin';
import db from '../firebase';

exports.storeMessage = async (req, res) => {
  try {
    const { conversationId, sender, message } = req.body;

    if (!conversationId || !sender || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = {
      sender,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .add(newMessage);

    res.status(200).json({ message: 'Message stored', id: docRef.id });
  } catch (error) {
    console.error('Store message error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
