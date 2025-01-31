const express = require('express');

const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => console.log('Server running on port 3000'));

// Function to fetch current quiz data from Quiz Endpoint

const fetchCurrentQuizData = async () => {
    try {
        const response = await axios.get('https://www.jsonkeeper.com/b/LLQT');
        return response.data;
    } catch (error) {
        console.error('Error fetching current quiz data:', error);
    }
};

// Function to fetch quiz submission data from Quiz Submission Endpoint

const fetchQuizSubmissionData = async () => {
    try {
        const response = await axios.get('https://api.jsonserve.com/rJvd7g');
        return response.data; 
    } catch (error) {
        console.error('Error fetching quiz submission data:', error);
    }
};