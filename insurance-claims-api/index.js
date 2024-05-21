const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let claims = [];

// Submit a new claim
app.post('/api/claims', (req, res) => {
    const claim = {
        id: uuidv4(),
        status: 'pending',
        ...req.body
    };
    claims.push(claim);
    res.status(201).json(claim);
});

// Retrieve details of a specific claim
app.get('/api/claims/:claimId', (req, res) => {
    const { claimId } = req.params;
    const claim = claims.find(c => c.id === claimId);
    if (claim) {
        res.json(claim);
    } else {
        res.status(404).json({ message: 'Claim not found' });
    }
});

// Update the status of a claim
app.put('/api/claims/:claimId/status', (req, res) => {
    const { claimId } = req.params;
    const { status } = req.body;
    let claim = claims.find(c => c.id === claimId);
    if (claim) {
        claim.status = status;
        claims = claims.map(c => (c.id === claimId ? claim : c));
        res.json(claim);
    } else {
        res.status(404).json({ message: 'Claim not found' });
    }
});

// Retrieve all claims for a customer
app.get('/api/customers/:customerId/claims', (req, res) => {
    const { customerId } = req.params;
    const customerClaims = claims.filter(c => c.customerId === customerId);
    res.json(customerClaims);
});

// Notify customer about claim status change (simulated)
app.post('/api/claims/:claimId/notify', (req, res) => {
    const { claimId } = req.params;
    const claim = claims.find(c => c.id === claimId);
    if (claim) {
        // Simulate notification (e.g., send email/SMS)
        res.json({ message: `Customer notified about claim ${claimId} status: ${claim.status}` });
    } else {
        res.status(404).json({ message: 'Claim not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Insurance Claims Processing API is running on http://localhost:${port}`);
});
