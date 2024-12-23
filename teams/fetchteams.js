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










document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const equipo = document.getElementById('playerSearch').value.trim();
    const selectedValue = document.getElementById('ligas').value; 
    const season= document.getElementById('seasons').value;
    console.log(equipo);
    console.log(selectedValue);
    console.log(season);
    
    
      fetchTeams(equipo,selectedValue,season); 
    
  });
  
  function fetchTeams(equipo,selectedValue,season) {
    fetch(`https://v3.football.api-sports.io/teams?league=${selectedValue}&season=${season}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "6183d09d0ae4c02dd619a6029e5e4e6b"
      }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const filteredTeams = data.response.filter(team =>
            team.team.name.toLowerCase().includes(equipo.toLowerCase())
        );

        console.log("LOS EQUIPOS SON"+filteredTeams);
        procesarteams( filteredTeams );
    } )
    .catch(err => {
      console.log(err);
    });
  }
  
  function procesarteams(filteredTeams) {

    
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    if (filteredTeams.length === 0) {
        const noTeamsMessage = document.createElement('p');
        noTeamsMessage.textContent = 'No se encontraron equipos.';
        container.appendChild(noTeamsMessage);
        return;
    }
    filteredTeams.forEach(team => {
        const plantilla = document.getElementById('card');
        let card = plantilla.cloneNode(true);
        card.style.display = 'block';
        const col = document.createElement('div');
        col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
        card.setAttribute("id", team.team.id);
        let img = card.querySelector(".card-img-top");
        img.setAttribute("src", team.team.logo);
        let titulo = card.querySelector(".card-title");
        titulo.textContent = team.team.name;
        let lista = card.querySelectorAll(".list-group-item");
        lista[0].textContent = `Código: ${team.team.code}`;
        lista[1].textContent = `País: ${team.team.country}`;
        lista[2].textContent = `Año de fundación: ${team.team.founded}`;
        col.appendChild(card);
        container.appendChild(col);
    });



  
   
  }
  


document.getElementById('cardsContainer').addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    if (card) {
        const teamId = card.id;
        const showPlayersLink = event.target.closest('.list-group-item a');
        if (showPlayersLink) {
            event.preventDefault();
            mostrarJugadores(teamId);
        }
    }
});

function mostrarJugadores(teamId) {
    document.getElementById('jugadoresContainer').style.display = 'block';
    fetch(`https://v3.football.api-sports.io/players/squads?team=${teamId}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "6183d09d0ae4c02dd619a6029e5e4e6b"
        }
    })
    .then(response => response.json())
    .then(data => mostrarListaJugadores(data))
    .catch(err => {
        console.log(err);
    });
}

function mostrarListaJugadores(data) {
    const jugadoresList = document.getElementById('jugadoresList');
    jugadoresList.innerHTML = '';
    if (data.response.length === 0) {
        const noPlayersMessage = document.createElement('p');
        noPlayersMessage.textContent = 'No se encontraron jugadores para este equipo.';
        jugadoresList.appendChild(noPlayersMessage);
        return;
    }
    const players = data.response[0].players;
    players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `
            <strong>${player.name}</strong> (Edad: ${player.age})<br>
            <img src="${player.photo}" alt="${player.name}" width="30" height="30"> ${player.position} <br>
            Número: ${player.number ? player.number : 'N/A'}
        `;
        jugadoresList.appendChild(listItem);
    });
}
