// controllers/conversationController.js
import Conversation from '../models/Conversation.js';

// Save new message to conversation (create or update)
export const saveMessage = async (req, res) => {
  try {
    const { process_query, response, folder } = req.body;
    const userId = req.user.id;

    if (!process_query || !response || !folder) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Check if a conversation exists for this user and clone
    let conversation = await Conversation.findOne({ userId, cloneId: folder });

    const userMessage = {
      role: 'user',
      content: process_query,
      timestamp: new Date(),
    };

    const cloneMessage = {
      role: 'clone',
      content: response,
      timestamp: new Date(),
    };

    if (!conversation) {
      // Create new conversation
      conversation = new Conversation({
        userId,
        cloneId: folder,
        messages: [userMessage, cloneMessage],
      });
    } else {
      // Append to existing
      conversation.messages.push(userMessage, cloneMessage);
    }

    await conversation.save();
    return res.status(200).json({ message: 'Message saved', conversation });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all conversations of a user
export const getUserConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await Conversation.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(conversations);
  } catch (err) {
    console.error('Error fetching conversations:', err);
    res.status(500).json({ error: 'Failed to retrieve conversations' });
  }
};

// Get one conversation by cloneId
export const getConversationByClone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cloneId } = req.params;
    const conversation = await Conversation.findOne({ userId, cloneId });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.status(200).json(conversation);
  } catch (err) {
    console.error('Error fetching conversation:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
