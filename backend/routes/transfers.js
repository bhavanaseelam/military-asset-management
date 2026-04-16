const express = require("express");
const router = express.Router();
const Transfer = require("../models/Transfer");

// Add Transfer
router.post("/", async (req, res) => {
    try {
        const newTransfer = new Transfer(req.body);
        await newTransfer.save();
        res.status(201).json(newTransfer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Transfers
router.get("/", async (req, res) => {
    try {
        const transfers = await Transfer.find();
        res.json(transfers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;