const axios = require('axios');

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

// Function to predict college based on NEET rank

const predictCollege = (predictedRank) => {

    // College cutoff data (source: Vedantu)

    const collegeCutoffs = [
    { "college": "AIIMS Delhi", "cutoff": 57 },
    { "college": "KMC Manipal", "cutoff": 24330 },
    { "college": "JIPMER Puducherry", "cutoff": 60 },
    { "college": "KGMU Lucknow", "cutoff": 1097 },
    { "college": "PGIMS Rohtak", "cutoff": 4588 },
    { "college": "IMS BHU Varanasi", "cutoff": 858 },
    { "college": "AMU Aligarh", "cutoff": 3304 },
    { "college": "MAMC Delhi", "cutoff": 85 },
    { "college": "KMC Mangalore", "cutoff": 30856 },
    { "college": "VMMC Delhi", "cutoff": 107 },
    { "college": "UCMS Delhi", "cutoff": 304 },
    { "college": "RIMS Imphal", "cutoff": 9762 },
    { "college": "SVIMS Tirupati", "cutoff": 10624 },
    { "college": "Grant Medical College Mumbai", "cutoff": 1623 },
    { "college": "BMCRI Bangalore", "cutoff": 1271 },
    { "college": "GSMC Mumbai", "cutoff": 656 },
    { "college": "GMCH Chandigarh", "cutoff": 544 },
    { "college": "Kolkata Medical College", "cutoff": 2103 },
    { "college": "Osmania Medical College", "cutoff": 3436 },
    { "college": "MGIMS Wardha", "cutoff": 8793 },
    { "college": "Amrita School of Medicine Kochi", "cutoff": 138654 },
    { "college": "RPGMC Kangra", "cutoff": 4422 },
    { "college": "KSHEMA Mangalore", "cutoff": 33023 },
    { "college": "LHMC Delhi", "cutoff": 485 },
    { "college": "MMC Chennai", "cutoff": 622 },
    { "college": "LTMMC Mumbai", "cutoff": 2582 },
    { "college": "BJMC Pune", "cutoff": 1892 },
    { "college": "IPGMER Kolkata", "cutoff": 2249 },
    { "college": "BJMC Ahmedabad", "cutoff": 594 },
    { "college": "AIIMS Jodhpur", "cutoff": 469 },
    { "college": "Sri Ramachandra Medical College Chennai", "cutoff": 223101 },
    { "college": "MGMCRI Pondicherry", "cutoff": 805350 },
    { "college": "RGKMCH Kolkata", "cutoff": 4802 }
    ];

    // Find colleges where the predicted rank is within the cutoff

    const eligibleColleges = collegeCutoffs
        .filter(college => predictedRank <= college.cutoff)
        .map(college => college.college);

    // Predict the most probable college
    const mostProbableCollege = predictMostProbableCollege(predictedRank, collegeCutoffs);

    return {
        eligibleColleges,
        mostProbableCollege
    };

};

// Function to predict the most probable college

const predictMostProbableCollege = (predictedRank, collegeCutoffs) => {
    // Sort colleges by cutoff rank (ascending order)
    const sortedColleges = collegeCutoffs.sort((a, b) => a.cutoff - b.cutoff);

    // Find the first college where the student's rank is within the cutoff
    const probableCollege = sortedColleges.find(college => predictedRank <= college.cutoff);

    // If no college is found, return null or a default message
    return probableCollege ? probableCollege.college : 'No eligible college found';
};

module.exports = {
    fetchAllData,
    analyzeCurrentQuiz,
    analyzeHistoricalQuiz,
    predictRank,
    predictCollege
};