const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// Add Assignment
router.post("/", async (req, res) => {
    try {
        const newAssignment = new Assignment(req.body);
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Assignments
router.get("/", async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;