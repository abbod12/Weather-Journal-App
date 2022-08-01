/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseUrl= "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey= "&appid=25b03732219fd851edbb9f571700c010&units=imperial";

document.getElementById('generate').addEventListener('click', performAction);
function performAction(e){
    e.preventDefault();
    const newZip= document.getElementById('zip').value;
    const feelings= document.getElementById('feelings').value;
    weatherInfo(baseUrl, newZip, apiKey)
    .then(data =>{
        

        postFromGet("/post", {date: newDate, temp: data.main.temp, content: feelings})

        .then( () =>updateUI())
    })
}

const weatherInfo= async(baseUrl, newZip, apiKey) =>{
    const res= await fetch(baseUrl + newZip + apiKey);
    try{
        const dataJson= await res.json();
        console.log('weatherInfo Json',dataJson);
        return dataJson;
    }catch(error){
        console.log('error', error)
    }
};

const postFromGet= async (url= "", info= {})=>{
        
    const response= await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(info)
    });
    try{
        const newData= await response.json();
        console.log("PostFromGet Json", response);
        return newData; 
    }catch(error){
        console.log('error', error);
    }
};
const updateUI= async() =>{
    const request= await fetch("/get");
    try{
        const allData= await request.json();
        console.log('UpdateUI json: ', allData);

    document.getElementById('date').innerHTML= `Date:  ${allData.date}`;
    document.getElementById('temp').innerHTML= `Temperature:  ${Math.round(allData.temp)}&degC` ;
    document.getElementById('content').innerHTML= `I feel:  ${allData.content}`;

    
    }catch(error){
        console.log('error', error);
    }
};