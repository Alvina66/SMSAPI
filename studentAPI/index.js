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
        const result = await pool.query('select * from student');
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/jobs',async(req,res)=>{
    try{
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/count_regions',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from regions');
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/count_countries',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from countries');
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/count_locations',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from locations');
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/count_departments',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from departments');
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/count_employees',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from employees');
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/count_jobid',async(req,res)=>{
    try{
        const result = await pool.query('select count(*) from jobs');
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/q_50',async(req,res)=>{
    try{
        const result = await pool.query(`select 
                jh.*, 
                e.first_name, 
                e.last_name, 
                j.job_title, 
                d.department_name, 
                l.city, 
                c.country_name
            from job_history jh
            join jobs j on jh.job_id = j.job_id
            join employees e on jh.employee_id = e.employee_id
            join departments d on jh.department_id = d.department_id
            join locations l on d.location_id = l.location_id
            join countries c on l.country_id = c.country_id;`);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/q_51',async(req,res)=>{
    try{
        const result = await pool.query(`Select r.*,c.* ,l.*
        From regions r
        join countries c on r.region_id=c.region_id 
        join locations l on l.country_id= c.country_id ;`);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/q_52',async(req,res)=>{
    try{
        const result = await pool.query(`Select r.*,c.* ,l.*
            From countries c 
            join regions r on c.region_id=r.region_id 
            join locations l on l.country_id= c.country_id ; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_53',async(req,res)=>{
    try{
        const result = await pool.query(`select From  locations  l
            join countries c on l.country_id= c.country_id 
            join regions r  on c.region_id=r.region_id  ; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_54',async(req,res)=>{
    try{
        const result = await pool.query(`Select d.department_id,
                d.department_name,
                e.employee_id,
                e.first_name,
                e.last_name,
                l.location_id,
                l.street_address,
                l.city,
                l.state_province
            From  departments d
            join employees e on d.department_id=e.department_id
            join locations l  on d.location_id=l.location_id ;`);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_55',async(req,res)=>{
    try{
        const result = await pool.query(`Select d.department_id,
            d.department_name,
            e.employee_id,
            e.first_name,
            e.last_name,
            l.location_id,
            l.street_address,
            l.city,
            l.state_province,
            c.country_name,
            c.country_id
        From  employees e
        join departments d on e.department_id=d.department_id
        join locations l  on d.location_id=l.location_id
        Join countries c on l.country_id=c.country_id ;`);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_56',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.employee_id, m.first_name, m.employee_id,d.department_id,d.department_name, l.location_id, l.city 
            From employees e 
            Join employees m on  e.manager_id = m.employee_id
            Join departments d on e.department_id=d.department_id
            Join locations l on d.location_id=l.location_id; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_57',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.employee_id,j.job_title ,d.department_id,d.department_name, l.location_id, l.city 
            From employees e 
            Join jobs j on e.job_id=j.job_id
            Join departments d on e.department_id=d.department_id
            Join locations l on d.location_id=l.location_id; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_58',async(req,res)=>{
    try{
        const result = await pool.query(`Select 
            e.first_name,
            e.employee_id,
            j.job_id,
            j.job_title,
            d.department_name,
            m.first_name,
            m.manager_id
            From employees e 
            Join jobs j on e.job_id=j.job_id 
            Join departments d on e.department_id =d.department_id
            Join employees m on e.manager_id =m.employee_id; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_60',async(req,res)=>{
    try{
        const result = await pool.query(`Select country_name 
            From countries
            where region_id =1; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_59',async(req,res)=>{
    try{
        const result = await pool.query(`Select 
            e.first_name,
            e.employee_id,
            j.job_id,
            j.job_title,
            d.department_name,
            m.first_name,
            m.manager_id,
            l.location_id,
            l.city
            From employees e 
            Join jobs j on e.job_id=j.job_id 
            Join departments d on e.department_id =d.department_id
            Join employees m on e.manager_id =m.employee_id
            Join locations l on  d.location_id=l.location_id; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_61',async(req,res)=>{
    try{
        const result = await pool.query(`Select d.department_name ,
            d.department_id,
            l.city
            From departments d 
            Join locations l on d.location_id =l.location_id 
            Where l.city like 'N%'  ; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_62',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.employee_id , d.department_name, d.department_id,m.employee_id AS manager_id,m.first_name as manager_name
            from employees e
            Join departments d on e.department_id=d.department_id
            join employees m on d.manager_id = m.employee_id
            Where e.commission_pct>0.15;
            `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_63',async(req,res)=>{
    try{
        const result = await pool.query(`Select j.job_title ,e.employee_id, e.first_name
            From employees e
            Join jobs j on e.job_id=j.job_id
            where e.employee_id in
            (select distinct(manager_id)
            From employees where manager_id is not null); `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_64',async(req,res)=>{
    try{
        const result = await pool.query(`Select l.postal_code 
            From regions r
            Join countries c on r.region_id=c.region_id
            Join locations l on c.country_id=l.country_id
            Where r.region_name= 'Asia';  `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_65',async(req,res)=>{
    try{
        const result = await pool.query(`select distinct d.department_name
            from departments d
            join employees e on d.department_id = e.department_id
            where e.commission_pct < (
                select avg(commission_pct)
                from employees
                where commission_pct is not null); `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_66', async (req, res) => {
    try {
        const result = await pool.query(`
            select j.job_title
            from employees e
            join jobs j on e.job_id = j.job_id
            where e.salary > (
                select avg(salary)
                from employees
                where department_id = e.department_id
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/q_67',async(req,res)=>{
    try{
        const result = await pool.query(`Select employee_id
            From employees where department_id is null;  `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_68',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name 
            From employees e
            Join job_history jh on e.employee_id=jh.employee_id
            Group by e.employee_id ,e.first_name 
            having count(*)>1;  `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_69',async(req,res)=>{
    try{
        const result = await pool.query(`Select department_name,count(employee_id)
            From departments d 
            Join employees e ON d.department_id = e.department_id
            Group by department_name; `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_70',async(req,res)=>{
    try{
        const result = await pool.query(`Select job_title ,sum(e.salary)
            From employees e 
            Join jobs j on e.job_id=j.job_id
            Group by job_title;   `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});
app.get('/q_71',async(req,res)=>{
    try{
        const result = await pool.query(`Select d.department_name,avg(e.commission_pct)
            From departments d 
            Join employees e ON d.department_id = e.department_id
            Group by department_name;   `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/q_72',async(req,res)=>{
    try{
        const result = await pool.query(`Select c.country_name, MAX(e.salary) AS max_salary
            From countries c
            Join locations l ON c.country_id = l.country_id
            Join departments d ON l.location_id = d.location_id
            Join employees e ON d.department_id = e.department_id
            Group by c.country_name;    `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/q_73',async(req,res)=>{
    try{
        const result = await pool.query(`Select e.first_name, e.last_name, d.department_name, l.city, l.state_province
            From employees e
            Join departments d on e.department_id = d.department_id
            Join locations l on d.location_id = l.location_id
            WHERE lower(e.first_name) like'%z%';  `);
        res.json(result.rows);
    }
    catch(err)
    {
        res.status(500).json({Error: err.message});  
    }
});

app.get('/q_74', async (req, res) => {
    try {
        const result = await pool.query(`
            select 
                j.job_title, 
                d.department_name, 
                e.first_name || ' ' || e.last_name as full_name, 
                jh.start_date
            from job_history jh
            join employees e on jh.employee_id = e.employee_id
            join jobs j on jh.job_id = j.job_id
            join departments d on jh.department_id = d.department_id
            where jh.start_date >= '1993-01-01' 
            and jh.end_date <= '1997-08-31';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q_75', async (req, res) => {
    try {
        const result = await pool.query(`
            select 
                c.country_name, 
                l.city, 
                count(distinct d.department_id) as department_count
            from countries c
            join locations l on c.country_id = l.country_id
            join departments d on l.location_id = d.location_id
            join employees e on d.department_id = e.department_id
            group by c.country_name, l.city
            having count(e.employee_id) >= 2;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q_76', async (req, res) => {
    try {
        const result = await pool.query(`
            select 
                e.first_name , 
                j.job_title, 
                jh.start_date, 
                jh.end_date
            from job_history jh
            join employees e on jh.employee_id = e.employee_id
            join jobs j on jh.job_id = j.job_id
            where e.commission_pct is null;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q_77', async (req, res) => {
    try {
        const result = await pool.query(`
            select 
                e.first_name,
                e.employee_id,
                c.country_name
            from employees e
            join departments d on e.department_id = d.department_id
            join locations l on d.location_id = l.location_id
            join countries c on l.country_id = c.country_id;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q_78', async (req, res) => {
    try {
        const result = await pool.query(`
            select 
                first_name, 
                last_name, 
                salary, 
                department_id
            from employees
            where salary in (
                select min(salary)
                from employees
                group by department_id
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q_79', async (req, res) => {
    try {
        const result = await pool.query(`
            select * from employees
            where salary = (
                select distinct salary from (
                    select salary, dense_rank() over(order by salary desc) as rank
                    from employees
                ) as ranked
                where rank = 3
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q_80', async (req, res) => {
    try {
        const result = await pool.query(`
            select e.employee_id, e.first_name, e.last_name, e.salary
            from employees e
            join departments d on e.department_id = d.department_id
            where e.salary > (
                select avg(salary) from employees
            )
            and e.department_id in (
                select distinct department_id
                from employees
                where lower(first_name) like '%j%' or lower(last_name) like '%j%'
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q_81', async (req, res) => {
    try {
        const result = await pool.query(`
            select e.first_name, e.last_name, e.employee_id, j.job_title
            from employees e
            join jobs j on e.job_id = j.job_id
            join departments d on e.department_id = d.department_id
            join locations l on d.location_id = l.location_id
            where lower(l.city) = 'toronto';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`connected succesfully ..... running on port ${PORT}`);
});