require('dotenv').config();
const express = require('express');

const app = express();
const PORT = 3000;

// routes
const userRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');

// service
const { updateNewsCache } = require('./services/newsService');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/news', newsRoutes);


// Run once when the server starts
// updateNewsCache();
// Periodically update news cache
setInterval(updateNewsCache, 3600000); // every hour


app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    }
    else{ 
        console.log("Error occurred, server can't start", error);
    }
}
);


module.exports = app;