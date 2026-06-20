require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const repliesRoutes = require('./routes/replies');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'VERY-NICE-SECRET-KEY',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/replies', repliesRoutes);

app.get('/api', (req, res) => {
    res.json({message: `I'm alive!`});
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, './static')));

// Catch-all route to serve index.html for client-side routing
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, './static/index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
