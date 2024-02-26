import express from 'express';

// Create Express app and port
const app = express();
const port = process.env.PORT || 6000;

// Custom logging middleware
app.use((req, res, next) => {
    const startTime = Date.now();
    const { method, url } = req;
    console.log(`[${new Date().toISOString()}] ${method} ${url}`);
    res.on('finish', () => {
        const elapsedTime = Date.now() - startTime;
        console.log(`[${new Date().toISOString()}] ${method} ${url} - ${elapsedTime}ms`);
    });
    next();
});

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});