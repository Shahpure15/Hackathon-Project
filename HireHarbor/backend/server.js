const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeroutes');

const app = express();

// Enable CORS and JSON parsing.
app.use(cors());
app.use(express.json());

// Mount resume routes under '/api/resume'
app.use('/api/resume', resumeRoutes);

// Global error handler.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
