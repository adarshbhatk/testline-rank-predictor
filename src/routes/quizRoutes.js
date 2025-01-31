const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Define API endpoints
router.post('/analyze-quiz', quizController.analyzeQuiz); // Analyze quiz data
router.post('/predict-rank', quizController.predictRank); // Predict NEET rank
router.post('/predict-college', quizController.predictCollege); // Predict colleges

module.exports = router;