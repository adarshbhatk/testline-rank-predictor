# NEET Rank Predictor
This project analyzes quiz performance and predicts NEET rank and college admission based on past quiz data.

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `node app.js` to start the server.
4. Access the API:
    The server will start on http://localhost:3000.
    Use tools like Postman to interact with the API.

## API Endpoints
- POST /analyze-quiz: Analyze quiz data.
- POST /predict-rank: Predict NEET rank.
- POST /predict-college: Predict eligible colleges and most probable college.

1. Analyze Quiz Data
    Endpoint: POST /api/analyze-quiz
    Description: Analyzes the current quiz data and returns accuracy by topic.
    Example Response:
        {
            "currentQuizAnalysis": {
                "structural organisation in animals": {
                    "correct": 128,
                    "total": 128,
                    "accuracy": "100.00"
                }
            }
        }

2. Predict NEET Rank
    Endpoint: POST /api/predict-rank
    Description: Predicts the NEET rank based on historical quiz performance.
    Example Response:
        {
            "predictedRank": 93971
        }

3. Predict Colleges
    Endpoint: POST /api/predict-college
    Description: Predicts eligible colleges and the most probable college based on the predicted rank.
    Example Response:
        {
            "eligibleColleges": [
                "Amrita School of Medicine Kochi",
                "Sri Ramachandra Medical College Chennai",
                "MGMCRI Pondicherry"
            ],
            "mostProbableCollege": "Amrita School of Medicine Kochi"
        }