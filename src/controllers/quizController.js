const quizService = require('../services/quizService');

// Controller to analyze quiz data

const analyzeQuiz = async (req, res) => {
    try {
        const data = await quizService.fetchAllData();
        const currentQuizAnalysis = quizService.analyzeCurrentQuiz(data.currentQuizData);
        res.json({ currentQuizAnalysis });
    } catch (error) {
        res.status(500).json({ error: 'Error analyzing quiz data' });
    }
};

// Controller to predict NEET rank

const predictRank = async (req, res) => {
    try {
        const data = await quizService.fetchAllData();
        const predictedRank = quizService.predictRank(data.historicalQuizData);
        res.json({ predictedRank });
    } catch (error) {
        res.status(500).json({ error: 'Error predicting rank' });
    }
};

// Controller to predict eligible colleges and the most probable college

const predictCollege = async (req, res) => {
    try {
        const data = await quizService.fetchAllData();
        const predictedRank = quizService.predictRank(data.historicalQuizData);
        const collegePredictions = quizService.predictCollege(predictedRank);
        res.json(collegePredictions);
    } catch (error) {
        res.status(500).json({ error: 'Error predicting college' });
    }
};

module.exports = {
    analyzeQuiz,
    predictRank,
    predictCollege
};