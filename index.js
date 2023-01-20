require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cors = require('cors');
const port = 3001

// Connect to the database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})

// Check for database connection errors
const database = mongoose.connection
console.log("Database connecting")
database.on('error', (error) => { console.error(`Database connection error: ${error}`) })
database.once('connected', () => { console.log('Database Connected'); })

const routes = require('./routes/routes')

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes)

app.listen(port, () => { console.log(`Server Started on port ${port}`) })


// app.use("/img", express.static("images"));
// use 'npm start' to start the server
// use 'multer-cloud-storage' to upload files to the cloud storage
// package: https://www.npmjs.com/package/multer-cloud-storage

// ⚠️ Some important notes
// helpers folder: function that can be reuse for multiple entity
// middlewares folder: to get specific entity data
// model folder: mongodb schema validation for the entity
// routes folder: api async function
// services folder
// - product.helper.js
//      can hvae many methods
//      retriev id:
//      something that can reuse
//      normal function, no need db call
//      no need async await
// - product.service.js
//      database logic
//      save | del | update |
//      important : data validation - cross check
//      combine fname + lname logic (in case)
//      use once
//      only use for del product img
// validators folder: joi validation