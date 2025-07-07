async function fetchPokemon() {
      const input = document.getElementById('pokemon-input').value.toLowerCase().trim();  /* gets the user info and converts it to lowercase per API requirements*/
      const infoDiv = document.getElementById('pokemon-info');                            /* sets div with pokemon-info */
      infoDiv.innerHTML = 'Loading...';                                                   /* Displays loading message while handshaking with API */

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);       /* fetches data from PokeAPI */ 
        if (!response.ok) throw new Error('Pokémon not found');                           /* checks for errors if pokemon name is not found or mistyped it will throw the error message 'Pokémon not found' */

        const data = await response.json();                                               

       
        const pokemon = {                                                                 /* Extracts pokemon relevant data */
          name: data.name,                                   
          image: data.sprites.front_default,
          types: data.types.map(t => t.type.name).join(', ')
        };

                                                                                         /* replaces DOM with pokemon info, convers the name to uppercase and displays the image and the type */
        infoDiv.innerHTML = `                                                            
          <h2>${pokemon.name.toUpperCase()}</h2>
          <img src="${pokemon.image}" alt="${pokemon.name}" />
          <p><strong>Type:</strong> ${pokemon.types}</p>
        `;
      } catch (error) {                                                                  /* Executes the error handling set in line 8 */
        infoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
      }
    }