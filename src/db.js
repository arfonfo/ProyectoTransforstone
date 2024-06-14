const mysql = require('mysql2/promise') // Import the mysql2/promise module to interact with MySQL
const dotenv = require('dotenv') // Import the dotenv module to load environment variables

dotenv.config() // Load environment variables from the .env file

//Configuration for the database connection

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}

// Create the connection pool
const pool = mysql.createPool(dbConfig)

// Export the connection pool
module.exports = { pool }
