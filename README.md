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


## How It Works

1. Data Fetching

The project starts by fetching data from three API endpoints:

    1. Current Quiz Data: 
    
    Fetches details of the user's latest quiz submission, including questions, topics, and responses.
    
    API Endpoint: https://www.jsonkeeper.com/b/LLQT

    2. Quiz Submission Data: 
    
    Fetches additional details about the user's quiz submission, such as selected options and correct answers.

    API Endpoint: https://api.jsonserve.com/rJvd7g

    3. Historical Quiz Data:

    Fetches performance data from the last 5 quizzes for each user, including scores and response maps.

    API Endpoint: https://api.jsonserve.com/XgAgFJ

Steps:

- Use the axios library to make HTTP requests to the API endpoints.

- Combine the fetched data into a single object for further processing.

2. Current Quiz Data Analysis

The current quiz data is analyzed to:

- Calculate accuracy by topic.

- Identify weak areas (topics with low accuracy).

Steps:

- Iterate through the questions in the current quiz data.

- For each question:

    - Determine the topic.

    - Check if the selected option matches the correct option.

    - Update the accuracy for the topic.

3. Historical Quiz Data Analysis

The historical quiz data is analyzed to:

- Identify trends in the user's performance over time.

- Calculate the average score across all quizzes.

Steps:

- Iterate through the historical quiz data.

- For each quiz:

    - Extract the date and score.

    - Store the score for the corresponding date.

4. NEET Rank Prediction

The NEET rank is predicted based on the user's historical quiz performance.

Steps:

- Calculate the average score from the historical quiz data.

- Use the formula to predict the rank (predictedRank = 100000 - averageScore * 100).

5. College Prediction

The most probable college is predicted based on the user's predicted NEET rank.

Steps:

- Define a list of colleges with their cutoff ranks.

- Sort the colleges by cutoff rank (ascending order).

- Find the first college where the user's rank is within the cutoff.

Contact

For any questions or feedback, feel free to reach out:

Email: adarshbhatk@gmail.com

GitHub: [adarshbhatk](https://github.com/adarshbhatk)

Website: https://adarshk.in/