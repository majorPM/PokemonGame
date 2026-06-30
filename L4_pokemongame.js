//Implement your code here 
const fightBtn = document.getElementById('fight');
fightBtn.addEventListener("click", pokemonFight);

let p1Score = 0;
let p2Score = 0;

const p1_name = document.getElementById('p1_name');
const p1_score = document.getElementById('p1_score');
const img1 = document.getElementById('img1');
const imgforP1 = document.createElement("img");
const name1 = document.getElementById('name1');
const experience1 = document.getElementById('experience1');
const abilities1 = document.getElementById('abilities1');

const p2_name = document.getElementById('p2_name');
const p2_score = document.getElementById('p2_score');
const img2 = document.getElementById('img2');
const imgforP2 = document.createElement("img");
const name2 = document.getElementById('name2');
const experience2 = document.getElementById('experience2');
const abilities2 = document.getElementById('abilities2');

function pokemonFight() { 

    fightBtn.classList.remove("lightning");

    // restart animation
    void fightBtn.offsetWidth;

    fightBtn.classList.add("lightning");


    abilities1.textContent = '';
    abilities2.textContent = '';

    let pokemonP1 = getRandomInt(1, 20);
    let pokemonP2 = getRandomInt(1, 20);

    p1_name.textContent = "Parag";
    p1_score.textContent = p1Score;

    p2_name.textContent = "Arnav";
    p2_score.textContent = p2Score;

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonP1}`)
        .then(response => {
            return response.json()
        })
        .then(user1 => {
            console.log(user1.sprites.other.dream_world.front_default)
            imgforP1.src = user1.sprites.other.dream_world.front_default;
            imgforP1.alt = user1.forms[0].name;
            img1.appendChild(imgforP1);

            name1.textContent =user1.forms[0].name ;
            experience1.textContent = user1.base_experience;

            user1.abilities.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.ability.name;
            abilities1.appendChild(li);
            });
        });

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonP2}`)
        .then(response => {
            return response.json()
        })
            .then(user2 => {
            console.log(user2.sprites.other.dream_world.front_default)
            imgforP2.src = user2.sprites.other.dream_world.front_default;
            imgforP2.alt = user2.forms[0].name;
            img2.appendChild(imgforP2);

            name2.textContent =user2.forms[0].name ;
            experience2.textContent = user2.base_experience;

            user2.abilities.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.ability.name;
            abilities2.appendChild(li);
            });
        });
    Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonP1}`)
        .then(res => res.json()),
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonP2}`)
        .then(res => res.json())
])
.then(([user1, user2]) => {

    console.log(user1.base_experience);
    console.log(user2.base_experience);

    if (user1.base_experience > user2.base_experience) {
        p1Score++;
    } else if(user1.base_experience < user2.base_experience) {
        p2Score++;
    } else {
        p1Score++;
        p2Score++;
    }

    p1_score.textContent = p1Score;
    p2_score.textContent = p2Score;
});
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
