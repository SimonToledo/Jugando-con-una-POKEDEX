$(function () {
    $('form').on('submit', function (evento) {
        evento.preventDefault(); // evita que se mande solo
        var dataPoints = [];

        //$('ul').html(``);
        var id = $("#pokeId").val();
        console.log(id);
        $.get(`https://pokeapi.co/api/v2/pokemon/${id}`, function (pokemon) {
            console.log(pokemon);
            var pokeName = pokemon.species.name;
            var pokeSprite = pokemon.sprites.front_default;
            console.log(pokeName);
        document.getElementById("nombrePokemon").innerHTML = `Pokemon N° ${pokemon.id} | ${pokeName}`;
        document.getElementById("spritePokemon").src = pokeSprite;
        
       

        var hp = pokemon.stats[5].base_stat;
        var atk = pokemon.stats[4].base_stat;
        var def = pokemon.stats[3].base_stat;
        var sat = pokemon.stats[2].base_stat;
        var sdf = pokemon.stats[1].base_stat;
        var spd = pokemon.stats[0].base_stat;
        console.log(hp);
        document.getElementById("statsPokemon").innerHTML = `
        <strong>HP</strong> = ${hp} <br>
        <strong>Ataque</strong> = ${atk} <br>
        <strong>Defensa</strong> = ${def} <br>
        <strong>Ataque Especial</strong> = ${sat} <br>
        <strong>Defensa Especial</strong> = ${sdf} <br>
        <strong>Velocidad</strong> = ${spd} <br>
        `;
        
        //generar array para cargar stats al grafico
        var pokeStats = [];
        pokeStats.push(hp, atk, def, sat, sdf, spd);
        console.log(pokeStats);
       

        
        var ctx = document.getElementById('chart');

        var chart = new Chart(ctx, {
        type: 'radar',
            data: {
                    datasets: [{
                        label: pokeName, // pokeName
                        data: pokeStats // pokeStats
                    }],
            labels: ['HP', 'Ataque', 'Defensa', 'At. Especial', 'Def. Especial', 'Velocidad']
            },
        options: {

        scale: {
            ticks: {
                suggestedMin: 0,
                suggestedMax: 250
            }
        }

}
});


        });
    });
});