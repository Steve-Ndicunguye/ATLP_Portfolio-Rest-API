import dotenv from 'dotenv';
import express from 'express';
const app = express()
import mongoose from 'mongoose';
import connectDB from './config/dbConn.js';
const PORT = process.env.PORT || 3500
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

//connect to databse
connectDB();

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My Portfolio Rest API",
        version: "1.0.0",
        description: "A simple Express Rest API"
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Development server" 
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            name: 'auth-token',
            in: 'header'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    apis: ["./routes/*.js", "./routes/api/*.js"]
  };
  
  const specs = swaggerJsDoc(options);

// enable CORS


// middleware for cookies
app.use(cookieParser())
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json  
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//routes

import registerRoute from './routes/register.js';
import loginRoute from './routes/auth.js';
import getUsersRoute from './routes/getUsers.js';
import contactRoute from './routes/api/queries.js';
import postsRoute from './routes/api/posts.js';
import commentsRoute from './routes/api/comments.js';

app.use('/register', cors(corsOptions) , registerRoute)
app.use('/login', cors(corsOptions), loginRoute)
app.use('/getAllUsers', cors(corsOptions), getUsersRoute)
app.use('/contact', cors(corsOptions), contactRoute)

app.use('/posts', cors(corsOptions), postsRoute)
app.use('/comments', cors(corsOptions), commentsRoute)

mongoose.connection.once('open', ()=> {
    console.log("Connected to MongoDB!")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
export default app.listen(5000); 
