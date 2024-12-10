fetch("https://v3.football.api-sports.io/leagues", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "6183d09d0ae4c02dd619a6029e5e4e6b"
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



