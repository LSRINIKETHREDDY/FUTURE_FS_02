const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// Get all leads
router.get('/', async (req, res) => {
    try {
        const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new lead
router.post('/', async (req, res) => {
    try {
        const { name, email, source, notes } = req.body;
        const newLead = await Lead.create({ name, email, source, notes });
        res.status(201).json(newLead);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a lead status
router.put('/:id', async (req, res) => {
    try {
        const { status, notes } = req.body;
        const lead = await Lead.findByPk(req.params.id);
        if (!lead) return res.status(404).json({ error: 'Lead not found' });

        if (status) lead.status = status;
        if (notes) lead.notes = notes; // Append or replace logic - here simplistic replace/update

        await lead.save();
        res.json(lead);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a lead
router.delete('/:id', async (req, res) => {
    try {
        const lead = await Lead.findByPk(req.params.id);
        if (!lead) return res.status(404).json({ error: 'Lead not found' });

        await lead.destroy();
        res.json({ message: 'Lead deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
