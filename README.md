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

1. Analyze Quiz Data <br />
    Endpoint: POST /api/analyze-quiz <br />
    Description: Analyzes the current quiz data and returns accuracy by topic. <br />
    Example Response: <br />
        {
            "currentQuizAnalysis": {
                "structural organisation in animals": {
                    "correct": 128,
                    "total": 128,
                    "accuracy": "100.00"
                }
            }
        }

2. Predict NEET Rank <br />
    Endpoint: POST /api/predict-rank <br />
    Description: Predicts the NEET rank based on historical quiz performance. <br />
    Example Response: <br />
        {
            "predictedRank": 93971
        }

3. Predict Colleges <br />
    Endpoint: POST /api/predict-college <br />
    Description: Predicts eligible colleges and the most probable college based on the predicted rank. <br />
    Example Response: <br />
        {
            "eligibleColleges": [
                "Amrita School of Medicine Kochi",
                "Sri Ramachandra Medical College Chennai",
                "MGMCRI Pondicherry"
            ],
            "mostProbableCollege": "Amrita School of Medicine Kochi"
        }

Contact

For any questions or feedback, feel free to reach out:

Email: adarshbhatk@gmail.com

GitHub: [adarshbhatk](https://github.com/adarshbhatk)

Website: https://adarshk.in/