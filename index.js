randomSpell();
let house ="";
let favoritos = {};

function showHouse(){
    house = document.getElementById("choice").value;
    fetch(`http://hp-api.herokuapp.com/api/characters/house/${house}`).then(function obtener(res){
        return res.json();
    }).then(function mostrar(data){
        console.log(data);
        document.getElementById("card").innerHTML="";
        favoritos = data;
        for(i=0;i<data.length;i++){
            if(data[i].image!==""){
            document.getElementById("card").innerHTML+=`
            <div class="cardContent">
            <img id="imgCard" src="${data[i].image}"/>
            <button id="fav" onclick="fav(${i})">Add to favorites</button>
            <div class="cardInfo">
            <p>Character name: ${data[i].name}</p>
            <p>Actor name: ${data[i].actor}</p>
            <p>Birth: ${data[i].dateOfBirth}</p>
            <p>Ancestry: ${data[i].ancestry}</p>
            </div>
            </div>
            `
            }
        }
    })
}
//Local Storage ----->
function fav(indice){
    console.log(favoritos[indice])
    if(JSON.parse(localStorage.getItem("fav"))===null){
        localStorage.setItem("fav",JSON.stringify([]))
    }
    let array = JSON.parse(localStorage.getItem("fav"))
    array.push(favoritos[indice])
    localStorage.setItem("fav",JSON.stringify(array))
    
}

function showFavs(){
    let favorites = JSON.parse(localStorage.getItem("fav"))
    console.log(favorites)
    document.getElementById("cardFav").innerHTML="";
    for(i=0;i<favorites.length;i++){
        document.getElementById("cardFav").innerHTML+=`
            <div class="cardFavIn">
            <img id="imgCard"src="${favorites[i].image}"/>
            <div class="cardInfo">
            <p>Character name: ${favorites[i].name}</p>
            <p>Actor name: ${favorites[i].actor}</p>
            <p>Birth: ${favorites[i].dateOfBirth}</p>
            <p>Ancestry: ${favorites[i].ancestry}</p>
            </div>
            </div>
            `
    }
}

function showBooks(){
    fetch(`https://fedeperin-harry-potter-api.herokuapp.com/libros`).then(function obtener(res){
        return res.json();
    }).then(function mostrar(data){
        console.log(data);
        document.getElementById("books").innerHTML="";
        for(i=0;i<data.length;i++){
            document.getElementById("books").innerHTML+=`
            
            <div class="bookInfo">
            <h3>${data[i].libro}</h3>
            <p>Autora: ${data[i].autora}</p>
            <p>Sinopsis: ${data[i].descripcion}</p>
            </div>
            `
        }
    })
}

function randomSpell(){
    let randomSpell = Math.floor(Math.random()*(72-1))+1;
    console.log(randomSpell)
    fetch(`https://fedeperin-harry-potter-api.herokuapp.com/hechizos`).then(function obtener(res){
        return res.json();
    }).then(function mostrar(spell){
        console.log(spell[randomSpell].hechizo);
        /* document.getElementById("random").innerHTML=""; */
            document.getElementById("random").innerHTML+=`
            <div class="randomSpell">
            <h3>${spell[randomSpell].hechizo}</h3>
            </div>
            `
        }
    )
}

{/* <img id="favIcon" src="${favExiste(i)?"src="./img/heartFull.png"":"src="./img/heartEmpty.png""}"/> */}