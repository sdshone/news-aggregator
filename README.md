# News Aggregator API

## Overview

This is a simple News Aggregator API built using Node.js and Express.js. It allows users to register, log in, set news preferences, and retrieve news articles based on their preferences. The API uses JWT for authentication. It also implements a caching mechanism to reduce the number of calls to the external news API.

## Features

- User registration and login with password hashing and JWT-based authentication.
- Set and update news preferences.
- Fetch news articles based on user preferences.
- Cache news articles to reduce API calls.
- Periodically update cached news articles.


## Installation

1. Clone the repository:

```bash
git clone https://github.com/sdshone/news-aggregatorgit
cd news-aggregator
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory with the following environment variables:

```PORT=3000
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_news_api_key
```

4. Start the server:

```
node app.js
```
The server will run on http://localhost:3000.


# API Endpoints


1. User Registration

    POST /users/register

    Registers a new user.
    ```
    curl -X POST http://localhost:3000/users/register \
    -H "Content-Type: application/json" \
    -d '{
    "name": "Clark Kent",
    "email": "clark@superman.com",
    "password": "Krypt()n8",
    "preferences": {
        "categories": ["general", "science"]
    }
    }'
    ```
    Response:

    201 Created on success

    400 Bad Request if validation fails

2. User Login

    POST /users/login

    Logs in a user.
    ```
    curl -X POST http://localhost:3000/users/login \
    -H "Content-Type: application/json" \
    -d '{
    "email": "clark@superman.com",
    "password": "Krypt()n8"
    }'

    ```
    Response
    ```
    {
    "token": "<JWT_TOKEN>"
    }
    ```

3. Get User Preferences

    GET /users/preferences

    Retrieves the news preferences for the logged-in user.
    ```
    curl -X GET http://localhost:3000/users/preferences \
    -H "Authorization: Bearer <JWT_TOKEN>"
    ```

4. Update User Preferences

    PUT /users/preferences

    Updates the news preferences for the logged-in user.
    ```
    curl -X PUT http://localhost:3000/users/preferences \
    -H "Authorization: Bearer <JWT_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{
    "preferences": {
        "categories": ["science", "sports", "business", "health"]
    }
    }'

    ```
    Response:

    200 OK on success

    400 Bad Request if validation fails


5. Get News
    GET /news

    Fetches news articles based on the logged-in user's preferences.
    ```
    curl -X GET http://localhost:3000/news \
    -H "Authorization: Bearer <JWT_TOKEN>"

    ```