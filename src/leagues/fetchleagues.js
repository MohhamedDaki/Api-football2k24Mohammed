fetch("https://v3.football.api-sports.io/leagues", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "a109bc27dca18f3c6a48a9668e918446"
    }
})
.then(response => response.json()) 
.then(data => procesarJson(data)) 
.catch(err => {
    console.log(err);
});


function procesarJson(data) {
    const select = document.getElementById('ligas'); 
    
    
    select.innerHTML = '';

    
    data.response.forEach(liga => {
        const option = document.createElement('option');
        option.value = liga.league.id; 
        option.textContent = liga.league.name;  
        
        select.appendChild(option); 
    });
}



