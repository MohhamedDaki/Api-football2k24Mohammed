document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const playerSearch = document.getElementById('playerSearch').value.trim();
    console.log(playerSearch);
    
    if (playerSearch.length >= 3) {
      fetchPlayers(playerSearch); // Realizar la búsqueda con el parámetro search
    } else {
      alert('Please enter at least 3 characters for the player name.');
    }
  });
  
  function fetchPlayers(playerSearch) {
    fetch(`https://v3.football.api-sports.io/players/profiles?search=${playerSearch}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "6183d09d0ae4c02dd619a6029e5e4e6b"
      }
    })
    .then(response => response.json())
    .then(data => procesarjugador(data))
    .catch(err => {
      console.log(err);
    });
  }
  
  function procesarjugador(data) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = '';
  
    if (!data.response || data.response.length === 0) {
      contenedor.innerHTML = "<p>No se han encontrado jugadores</p>";
      return;
    }
  
    // Añadir las tarjetas de los jugadores
    data.response.forEach(jugador => {
      const card = document.createElement('div');
      card.className = "col-md-4 col-sm-6 col-12 mb-4";  // Hacemos que las tarjetas sean responsivas
  
      card.innerHTML = `
        <div class="card player-card">
          <img src="${jugador.player.photo}" class="card-img-top" alt="${jugador.player.name || 'Sin nombre'}">
          <div class="card-body">
            <h5 class="card-title">${jugador.player.name || 'No existen datos'} ${jugador.player.lastname || ''}</h5>
            <p class="card-text">Nacionalidad: ${jugador.player.nationality || 'No existen datos'}</p>
            <p class="card-text">Posición: ${jugador.player.position || 'No existen datos'}</p>
            <p class="card-text">Altura: ${jugador.player.height || 'No existen datos'}</p>
            <p class="card-text">Peso: ${jugador.player.weight || 'No existen datos'}</p>
            <p class="card-text">Número: ${jugador.player.number || 'No existen datos'}</p>
          </div>
        </div>
      `;
  
      contenedor.appendChild(card);
    });
  }
  