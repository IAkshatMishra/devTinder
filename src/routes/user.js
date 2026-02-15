const express = require('express');
const { userAuth } = require('../middlewares/auth')
const userRouter = express.Router();
const User = require('../models/user')
const ConnectionRequest = require('../models/connectionRequest')
const USER_SAFE_DATA = "firstName lastName photoURL age gender about skills";

// get all the pending request the user has received
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        //Virender => Sachin
        // logged in hai sachin, wo dekh rha hai ki virender interested hai
        // toh sachin accept kr lega

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);
        //.populate("fromUserId",["firstName","lastName"]);

        res.json({ message: "Data fetched Successfully!", data: connectionRequests });
    }
    catch (err) {
        req.statusCode(400).send("Some Error Occured: " + err.message);
    }
});

// Will show users whose are a connection, i.e, users whose and whom connection request is accepted
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            else {
                return row.fromUserId;
            }
        });

        res.json({ data });
    }
    catch (err) {
        res.status(500).json({ message: "Some Error Occured: " + err.message })
    }
})

//To see a user's feed
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        limit = limit<50 ? limit : 10;
        const skip = (page-1)*limit;

        //Feed shouldn't include users that have been:-
        //1) sent a connection request, either ignore or interested
        //2) the person itself
        //3) those which are connections

        //Connections which user shouldn't see, which are sent or received 
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ]
        }).select("fromUserId toUserId")

        //Relating connections to user's profile which shouldn't be seen
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((row) => {
            hideUsersFromFeed.add(row.fromUserId._id.toString())
            hideUsersFromFeed.add(row.toUserId._id.toString())
        })
        //console.log(hideUsersFromFeed);

        // Edge Case: If a user has created a new profile, he shouldn't see his own profile
        //hideUsersFromFeed.add(loggedInUser._id.toString());

        const usersOnFeed = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        res.send(usersOnFeed);
    }
    catch (err) {
        res.status(500).send("Some Error Ocurred: " + err.message);
    }
})


module.exports = userRouter;