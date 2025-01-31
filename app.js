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

    // Display the data in console

    // console.log('Current Quiz Data:', data.currentQuizData);
    // console.log('Quiz Submission Data:', data.quizSubmissionData);
    // console.log('Historical Quiz Data:', data.historicalQuizData);

    // Analyze current quiz data
    const currentQuizAnalysis = analyzeCurrentQuiz(data.currentQuizData);
    console.log('Current Quiz Analysis (Accuracy by Topic):', currentQuizAnalysis);

    // Analyze historical quiz data
    const historicalQuizAnalysis = analyzeHistoricalQuiz(data.historicalQuizData);
    console.log('Historical Quiz Analysis (Performance Trends):', historicalQuizAnalysis);

    // Predict NEET rank
    const predictedRank = predictRank(data.historicalQuizData);
    console.log('Predicted NEET Rank:', predictedRank);

};

// Function to analyse current quiz data 

const analyzeCurrentQuiz = (quizData) => {
    const topicAccuracy = {}; // Store accuracy for each topic

    quizData.quiz.questions.forEach(question => {
        const topic = question.topic.trim(); 
        const isCorrect = question.selectedOption === question.correctOption; // Check if the answer is correct

        // Initialize the topic in the accuracy object if it doesn't exist
        if (!topicAccuracy[topic]) {
            topicAccuracy[topic] = { correct: 0, total: 0 };
        }

        // Update the total number of questions and correct answers for the topic
        topicAccuracy[topic].total += 1;
        if (isCorrect) {
            topicAccuracy[topic].correct += 1;
        }
    });

    // Calculate accuracy for each topic
    for (const topic in topicAccuracy) {
        const accuracy = (topicAccuracy[topic].correct / topicAccuracy[topic].total) * 100;
        topicAccuracy[topic].accuracy = accuracy.toFixed(2); 
    }

    return topicAccuracy;
};

// Function to analyze historical quiz data

const analyzeHistoricalQuiz = (historicalData) => {
    const performanceTrends = {}; // Store performance trends over time

    historicalData.forEach(quiz => {
        const date = quiz.submitted_at.split('T')[0]; // Get the date of the quiz
        const score = quiz.score; // Get the score of the quiz

        if (date && score !== undefined) {
            performanceTrends[date] = score;
        }

        // Store the score for the date

        performanceTrends[date] = score;
    });

    return performanceTrends;
};

// Function to predict NEET rank

const predictRank = (quizData) => {
    // Calculate the average score from the quiz data

    const totalScore = quizData.reduce((sum, quiz) => sum + quiz.score, 0);
    const averageScore = totalScore / quizData.length;

    // Example formula to predict rank

    const predictedRank = 100000 - averageScore * 100; // Higher score = better rank
    return Math.round(predictedRank); // Round to the nearest integer

    // Percentile = [(Total candidates - Your rank) / Total candidates] * 100
};

main();