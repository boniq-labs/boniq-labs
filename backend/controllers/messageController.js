import Message from '../models/Message.js';

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, content } = req.body;
    const message = await Message.create({ name, email, subject, content });
    res.status(201).json({ ...message.toJSON(), _id: message.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']]
    });
    const formattedMessages = messages.map(m => ({ ...m.toJSON(), _id: m.id }));
    res.json(formattedMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (typeof req.body.isRead === 'boolean') {
      message.isRead = req.body.isRead;
    }

    await message.save();
    res.json({ ...message.toJSON(), _id: message.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.destroy();
    res.json({ message: 'Message removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createMessage, getMessages, updateMessage, deleteMessage };
