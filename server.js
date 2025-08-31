const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== MongoDB Connection =====
mongoose.connect('mongodb://127.0.0.1:27017/Connect')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// ===== Schema & Model =====
const earlyAccessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const EarlyAccess = mongoose.model('EarlyAccess', earlyAccessSchema);

// ===== Routes =====
app.get('/', (req, res) => {
    res.send('Server is running.');
});

app.post('/early-access', async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        // Input validation
        if (!name || !phone || !email) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create & save new entry
        const newEntry = new EarlyAccess({ name, phone, email });
        await newEntry.save();

        res.status(201).json({ message: "Thank you! Your form submitted successfully!" });
    } catch (err) {
        console.error('Error saving to DB:', err);
        res.status(500).json({ error: 'Server error.' });
    }
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});