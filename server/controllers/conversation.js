// controllers/conversationController.js
import Conversation from '../models/Conversation.js';
import { v4 as uuidv4 } from 'uuid';

// Save a message to conversation with sessionId
// controllers/conversationController.js
const SESSION_TIMEOUT_MINUTES = 2;

export const saveMessage = async (req, res) => {
  try {
    const { process_query, response, folder } = req.body;
    const userId = req.user.id;
    console.log('Received message save request:', { 
      process_query, 
      folder, 
      userId,
      isSessionEnd: process_query === "Session ended"
    });

    if (!process_query || !response || !folder) {
      console.log('Missing fields in request:', { 
        process_query: !!process_query, 
        response: !!response, 
        folder: !!folder 
      });
      return res.status(400).json({ error: 'Missing fields' });
    }

    const now = new Date();

    // Find latest conversation for this user & clone
    let conversation = await Conversation.findOne({ userId, cloneId: folder })
      .sort({ lastMessageAt: -1 });
    console.log('Found existing conversation:', conversation ? {
      sessionId: conversation.sessionId,
      messageCount: conversation.messages.length,
      lastMessageAt: conversation.lastMessageAt
    } : 'No');

    const userMessage = {
      role: 'user',
      content: process_query,
      timestamp: now,
    };

    const cloneMessage = {
      role: 'clone',
      content: response,
      timestamp: now,
    };

    // If this is a session completion request
    if (process_query === "Session ended") {
      if (conversation) {
        const completionMessage = {
          role: 'system',
          content: 'Session completed',
          timestamp: now,
        };
        conversation.messages.push(completionMessage);
        conversation.lastMessageAt = now;
        await conversation.save();
        console.log('Session completed successfully:', {
          sessionId: conversation.sessionId,
          totalMessages: conversation.messages.length,
          completionTime: now
        });
        return res.status(200).json({ 
          message: 'Session completed successfully',
          sessionId: conversation.sessionId,
          totalMessages: conversation.messages.length
        });
      }
      console.log('No active conversation found to complete');
      return res.status(404).json({ message: 'No active conversation found' });
    }

    // Normal message handling
    const shouldStartNewSession = !conversation || ((now - new Date(conversation.lastMessageAt)) > SESSION_TIMEOUT_MINUTES * 60 * 1000);
    console.log('Should start new session:', shouldStartNewSession);

    if (shouldStartNewSession) {
      console.log('Creating new conversation session');
      conversation = new Conversation({
        userId,
        cloneId: folder,
        sessionId: uuidv4(),
        messages: [userMessage, cloneMessage],
        lastMessageAt: now,
      });
    } else {
      console.log('Adding messages to existing conversation');
      conversation.messages.push(userMessage, cloneMessage);
      conversation.lastMessageAt = now;
    }

    await conversation.save();
    console.log('Conversation saved successfully:', {
      sessionId: conversation.sessionId,
      messageCount: conversation.messages.length,
      lastMessageAt: conversation.lastMessageAt
    });
    return res.status(200).json({ 
      message: 'Message saved', 
      sessionId: conversation.sessionId,
      messageCount: conversation.messages.length
    });
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all conversations (sessions) for a user
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

// Get all sessions for a cloneId
export const getSessionsByClone = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cloneId } = req.params;
    const sessions = await Conversation.find({ userId, cloneId }).sort({ createdAt: -1 });

    if (!sessions.length) {
      return res.status(404).json({ message: 'No sessions found for this clone' });
    }

    res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching sessions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get specific conversation session by sessionId
export const getConversationBySession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sessionId } = req.params;

    const conversation = await Conversation.findOne({ userId, sessionId });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation session not found' });
    }

    res.status(200).json(conversation);
  } catch (err) {
    console.error('Error fetching conversation session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
