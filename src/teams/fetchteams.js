// Obtén las ligas al cargar la página
fetch("https://v3.football.api-sports.io/leagues", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "6183d09d0ae4c02dd619a6029e5e4e6b"
    }
})
.then(response => response.json())
.then(data => procesarLigas(data))
.catch(err => {
    console.log(err);
});

function procesarLigas(data) {
    const select = document.getElementById('ligas');
    select.innerHTML = ''; // Limpiar las opciones anteriores

    // Añadir las ligas al select
    data.response.forEach(liga => {
        const option = document.createElement('option');
        option.value = liga.league.id;
        option.textContent = liga.league.name;
        select.appendChild(option);
    });
}

const select = document.getElementById('ligas');

// Evento para cargar los equipos cuando se selecciona una liga
select.addEventListener('change', function () {
    const selectedValue = select.value;
    console.log("Valor seleccionado:", selectedValue);

    // Obtener equipos de la liga seleccionada
    fetch(`https://v3.football.api-sports.io/teams?league=${selectedValue}&season=2021`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "6183d09d0ae4c02dd619a6029e5e4e6b"
        }
    })
    .then(response => response.json())
    .then(data => procesarEquipos(data))
    .catch(err => {
        console.log(err);
    });
});

// Procesar los equipos obtenidos y crear las tarjetas
function procesarEquipos(data) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = ''; // Limpiar los equipos previos

    if (data.response.length === 0) {
        const noTeamsMessage = document.createElement('p');
        noTeamsMessage.textContent = 'No se encontraron equipos para esta liga.';
        container.appendChild(noTeamsMessage);
        return;
    }

    // Crear una tarjeta para cada equipo
    data.response.forEach(team => {
        const plantilla = document.getElementById('card');
        let card = plantilla.cloneNode(true);

        // Mostrar la tarjeta
        card.style.display = 'block';

        const col = document.createElement('div');
        col.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');

        // Establecer los datos de la tarjeta
        card.setAttribute("id", team.team.id);

        let img = card.querySelector(".card-img-top");
        img.setAttribute("src", team.team.logo);

        let titulo = card.querySelector(".card-title");
        titulo.textContent = team.team.name;

        let lista = card.querySelectorAll(".list-group-item");
        lista[0].textContent =`Código: ${team.team.code}`;
        lista[1].textContent =` País: ${team.team.country}`;
        lista[2].textContent = `Año de fundación: ${team.team.founded}`;
        lista[3].innerHTML = "<a>Mostrar jugadores</a>";

        // Agregar el evento de clic
        col.addEventListener('click', function () {
            obtenerJugadores(team.team.id); // Obtener jugadores al hacer clic
        });

        col.appendChild(card);
        container.appendChild(col);
    });
}

// Obtener los jugadores del equipo cuando se hace clic en una tarjeta
function obtenerJugadores(teamId) {
    fetch(`https://v3.football.api-sports.io/players/squads?team=${teamId}&season=2021`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '6183d09d0ae4c02dd619a6029e5e4e6b'
        }
    })
    .then(response => response.json())
    .then(data => {
        procesarJugadores(data);
    })
    .catch(err => {
        console.log('Error al obtener los jugadores:', err);
    });
}

// Función para mostrar los jugadores
function procesarJugadores(data) {
    const jugadoresContainer = document.getElementById('jugadoresContainer');
    const jugadoresList = document.getElementById('jugadoresList');
    jugadoresList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos jugadores

   
        data.response.forEach(player => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = player.player.name;
            jugadoresList.appendChild(li);
        });
        jugadoresContainer.style.display = 'block';
   
}











/*
   
   fetch(`https://v3.football.api-sports.io/players/squads?team=${teamId}&season=2021`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '6183d09d0ae4c02dd619a6029e5e4e6b'
        }
    })
    .then(response => response.json())
    .then(data => {
        procesarJugadores(data);
    })
    .catch(err => {
        console.log('Error al obtener los jugadores:', err);
    });



function procesarJugadores(data) {
  
}*/
