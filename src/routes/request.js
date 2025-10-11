const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

// Api to send connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type ", status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({ message: "User not found!!" });
      }
      const newConnection = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request already exists!!" });
      }

      const data = await newConnection.save();
      res.json({
        message: "Connection Request Sent",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "ignored"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type", status });
      }
      const toUserId = req.user._id;
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: toUserId,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(404).json({ message: "Connection not found!!" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
