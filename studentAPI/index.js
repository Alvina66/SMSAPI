const express =require('express');
const cors =require('cors');
const pool =require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req, res)=>{
    try {
        res.json('welcome to student api');
    } catch (error) {
        res.status(500).json({Error:error.message});
    }
});

app.get('/students',async(req,res)=>{
    try{
        const result = await Pool.query('select * from student');
        res.json(result.rows);
    }
    catch(err)
    {
       res.status(500).json({Erroe:err.message});
    }
});


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`connected succesfully ..... running on port ${PORT}`);
});