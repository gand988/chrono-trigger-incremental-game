// dom buttons
let clickButton = document.querySelector('.clickButton');

// dom elements
const score = document.getElementsByName('score'); 
const infoDamage = document.getElementsByName('infoDamage'); 
const infoDps = document.querySelector('.infoDps'); 
const infoGold = document.getElementsByName('infoGold');

// here will be displayed the enemy hp
const enemyHpData = document.querySelector('.enemyHpData'); 
const percent = document.querySelector('.percent');
let widthPer = 100; 

// dom element heroes
const unlock = document.getElementsByClassName('unlock'); 
for (let i = 0; i<unlock.length; i++){
  unlock[i].disabled = true; 
}

const heroLvlUp = document.getElementsByClassName('heroLvlUp');
const heroesLvlText = document.getElementsByClassName('heroesLvlText');
const heroesDps = document.getElementsByClassName('heroesDps');
const heroesGold = document.getElementsByClassName('heroesGold');

// <button class="heroLvlUp">lvlup</button>
// <p class="heroesLvlText" >Level: -</p> 
// <p class="heroesDps">Attack: -</p>

for(let i = 0; i<heroLvlUp.length; i++){
  heroLvlUp[i].addEventListener('click', ()=>{
    if(heroes[i].active == true && player.goldCollected >heroes[i].lvlUpGold()){
      heroes[i].lvl += 1; 
      player.dps += heroes[i].dps();
      player.goldCollected -= heroes[i].lvlUpGold();
      // refreshData(i);
      heroesLvlText[i].textContent = `Level: ${heroes[i].lvl}`;
      heroesDps[i].textContent = `Dps: ${heroes[i].dps()}`;
      heroesGold[i].textContent = `Gold: ${heroes[i].lvlUpGold()}`;
    }
    console.log(heroes[i].lvl, player.dps)
  })
}
// dom element player


let enemyInTheField = false; 
let enemy;

let player = {
  lvl: 1,
  exp: 0,
  clickDamage: 5, 
  dps: 0, 
  goldCollected: 0, 
  killCount: 0
}
// player.goldCollected = 1000; 
// heroes will be 
// hero list Crono, Lucca, Marle, Frog, Robo, Ayla, Magus, Spekkio, Schala, Melchior, Gaspar
let heroes = [
  {
    "id": 0, 
    "active": false,
    // need to rename to goldToUnlock,
    unlock: 10, 
    "hero": "Crono", 
    lvl: 1, 
    dps: function p() {return 1.5 * this.lvl}, 
    lvlUpGold: function x(){ return (this.unlock * this.lvl)*1.5},
    test: this.lvl * this.atk
    // todo : implement weapons
  }, 
  {
    "id": 1, 
    "active": false,
    "unlock": 20, 
    "hero": "Lucca", 
    "lvl": 1, 
    "atk": 2
  }
];



// initialiaze stuff
// initialiaze unlock button
for(let i = 0; i<unlock.length; i++){
  unlock[i].addEventListener('click', ()=>{
    if(heroes[i].active == false){
      if(player.goldCollected >= heroes[i].unlock){
        heroes[i].active = true;
        player.goldCollected -= heroes[i].unlock; 
        unlock[i].style.display = 'none'; 
        heroesLvlText[i].textContent = `Level: ${heroes[i].lvl}`;
        heroesDps[i].textContent = `Dps: ${heroes[i].dps()}`;
        heroesGold[i].textContent = `Gold: ${heroes[i].lvlUpGold()}`;
        console.log(heroes[i].hero + ' is unlocked')

      }
    }
  })
}

function Enemy(name, hp, gold){
  this.name = name; 
  this.hp = hp; 
  this.hpMax = hp; 
  this.gold = gold; 
}

function dpsHeroes(){
  // function to add damage from heroes to player
  player.dps += heroes[0].dps()
}


clickButton.addEventListener('click', ()=>{
  let crit = 0; 
  let kill = Math.floor(Math.random()*5); 
  if(kill % 3 == 0){
    crit = Math.floor(Math.random()*player.clickDamage)
    console.log(crit, kill)
  }
  enemy.hp -= player.clickDamage + crit;
    
    animationBar()
  })

function refreshData(x,y,z){
  // animationBar();
  checkForEnableHeroes();
  enemyHpData.textContent = `Enemy HP: ${enemy.hp}`; 
  infoDamage[0].textContent = `current dmg: ${player.clickDamage}`;
  infoGold[0].textContent = `current gold: ${player.goldCollected}`; 
  // heroesLvlText[x].textContent = `current level: ${heroes[x].lvl}`;
  // heroesDps[x].textContent = `current dps: ${heroes[x].dps()}`;
}

function animationBar(){
  widthPer -= (100*player.clickDamage)/enemy.hpMax; 
  percent.style.width = widthPer + '%'; 
  // console.log('dd', widthPer);
}

function checkForEnableHeroes(){
  for (let i = 0; i<unlock.length; i++){
    if(player.goldCollected >= heroes[i].unlock)
    {
      unlock[i].disabled = false; 
    }else{
      unlock[i].disabled = true; 
    }
  }
}
setInterval(() => {

  // check for enemy and create one
  if(!enemyInTheField){
    console.log('False || Generate new enemy');
    enemyInTheField = true; 
    enemy = new Enemy("Random", 20,  1); 
    console.log('hi')
    // enemy = new Enemy("Random", x=Math.floor(Math.random()*20),  1); 
  }else if(enemyInTheField && enemy.hp <= 0){
    // console.log('True || Enemy is in the field, kill it ')
    // console.log(enemy.name, enemy.hp, enemy.gold)
    widthPer= 100; 
    percent.style.width = widthPer + '%'; 
    enemy.gold = Math.floor(Math.random()*3); 
    player.goldCollected += enemy.gold; 
    enemyInTheField = false;
  }
  refreshData(); 
  /* 
  !!!!!!! THIS ONE IS WORKING !!!!!!!
  !!!!!!! THIS ONE IS WORKING !!!!!!!
  !!!!!!! THIS ONE IS WORKING !!!!!!!
  */
  // enemy.hp -= player.dps;

  console.log('enemy hp: ' + enemy.hp, 'player dps: ' + player.dps)


}, 40);

