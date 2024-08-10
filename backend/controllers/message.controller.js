import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req, res) => {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      //to find the conversation between sender and receiver
      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      //creating a conversation between this two users
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      // await conversation.save();
      // await newMessage.save();
      //instead combining both using promise in this both will run in parallel
      await Promise.all([conversation.save(), newMessage.save()]);

        //Socket.io functionality for real time
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          // io.to(<socket_id>).emit() used to send events to specific client
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

      res.status(200).json(newMessage);
    } catch (error) {
      //console logging a error message
      console.log("Error in sendMessage controller", error.message);
      //sending a error message
      res.status(500).json({ error: "Internal Server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;//coming from protectroute


        //to find the conversation between sender and receiver
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");//NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) {
            return res.status(404).json([]);
        }
        
        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
      //console logging a error message
      console.log("Error in getMessages controller", error.message);
      //sending a error message
      res.status(500).json({ error: "Internal Server error" });
    }
};

