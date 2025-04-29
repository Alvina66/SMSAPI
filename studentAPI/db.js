const{ Pool }=require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString:process.env.DATABSE_URL,
    ssl:{
        rejectUnauthorized:false
    }
});

module.exports=pool;

