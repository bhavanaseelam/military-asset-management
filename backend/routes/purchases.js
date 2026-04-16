const express = require("express");
const router = express.Router();
const Purchase = require("../models/Purchase");

// Add Purchase
router.post("/", async (req, res) => {
    try {
        const newPurchase = new Purchase(req.body);
        await newPurchase.save();
        res.status(201).json(newPurchase);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Purchases
router.get("/", async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;