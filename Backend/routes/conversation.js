const router = require("express").Router();

const Conversation = require("../models/Conversation");

// new conversions
router.post("/", async (req, res) => {

    const conversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversation = await conversation.save()
        res.status(201).json(savedConversation)
    } catch (error) {
        res.status(500).json({ message: error });
    }
})
//  get conversation of user 

router.get("/:userId", async (req, res) => {

    try {
        const conversation = await Conversation.find({ members: { $in: [req.params.userId] } })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json({ message: error });
    }
})
// get all conversations





module.exports = router;