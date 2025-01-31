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

// Function to fetch historical quiz data from Historical Quiz Endpoint

const fetchHistoricalQuizData = async () => {
    try {
        const response = await axios.get('https://api.jsonserve.com/XgAgFJ');
        return response.data; 
    } catch (error) {
        console.error('Error fetching historical quiz data:', error);
    }
};

// Function to fetch all data from the APIs

const fetchAllData = async () => {
    const currentQuizData = await fetchCurrentQuizData();
    const quizSubmissionData = await fetchQuizSubmissionData();
    const historicalQuizData = await fetchHistoricalQuizData();

    return {
        currentQuizData,
        quizSubmissionData,
        historicalQuizData
    };
};

// Main function to run the program

const main = async () => {
    console.log('Fetching data from APIs...');

    // Fetch all data

    const data = await fetchAllData();

    // Display the data
    console.log('Current Quiz Data:', data.currentQuizData);
    console.log('Quiz Submission Data:', data.quizSubmissionData);
    console.log('Historical Quiz Data:', data.historicalQuizData);
};

main();