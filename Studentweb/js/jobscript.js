const job_API_link= "https://curly-disco-q765wg94j74xc99gv-5001.app.github.dev/jobs";

fetch(job_API_link).then(response=>{
    if(!response.ok)
        throw new Error("failed to fetch data");
    return response.json();
}).then(data=>{
    const tbody=document.querySelector("#jobtable tbody");
    
    data.forEach(job=>{
        const row=document.createElement("tr");

        row.innerHTML=`
        <td> ${job.job_id} </td>
        <td> ${job.job_title} </td>
        <td> ${job.min_salary} </td>
        <td> ${job.max_salary} </td>
        `;
        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});