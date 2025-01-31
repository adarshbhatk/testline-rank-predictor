// Import the axios library to make API requests

const axios = require('axios');

const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log('Server running on port 3000'));

// Function to fetch current quiz data from Quiz Endpoint

const fetchCurrentQuizData = async () => {
    try {
        const response = await axios.get('https://www.jsonkeeper.com/b/LLQT');
        return response.data; // Return the data from the API
    } catch (error) {
        console.error('Error fetching current quiz data:', error);
    }
};
