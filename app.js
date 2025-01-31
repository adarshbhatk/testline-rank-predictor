const express = require('express');
const quizRoutes = require('./src/routes/quizRoutes');
const quizService = require('./src/services/quizService');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Use the quiz routes
app.use('/api', quizRoutes);

const port = 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

// Main function to run the program

const main = async () => {
    console.log('Fetching data from APIs...');

    // Fetch all data

    const data = await quizService.fetchAllData();

    // Display the data in console

    // console.log('Current Quiz Data:', data.currentQuizData);
    // console.log('Quiz Submission Data:', data.quizSubmissionData);
    // console.log('Historical Quiz Data:', data.historicalQuizData);

    // Analyze current quiz data
    const currentQuizAnalysis = quizService.analyzeCurrentQuiz(data.currentQuizData);
    console.log('Current Quiz Analysis (Accuracy by Topic):', currentQuizAnalysis);

    // Analyze historical quiz data
    const historicalQuizAnalysis = quizService.analyzeHistoricalQuiz(data.historicalQuizData);
    console.log('Historical Quiz Analysis (Performance Trends):', historicalQuizAnalysis);

    // Predict NEET rank
    const predictedRank = quizService.predictRank(data.historicalQuizData);
    console.log('Predicted NEET Rank:', predictedRank);

    // Predict eligible colleges and the most probable college
    const collegePredictions = quizService.predictCollege(predictedRank);
    console.log('Eligible Colleges:', collegePredictions.eligibleColleges);
    console.log('Most Probable College:', collegePredictions.mostProbableCollege);

};

main();