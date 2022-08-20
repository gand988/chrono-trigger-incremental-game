// dom buttons
let clickButton = document.querySelector('.clickButton');

/* 
  dom elements stats
  lvl: 1,
  exp: 0,
  clickDamage: 5, 
  dps: 0, 
  goldCollected: 0, 
  killCount: 0

  infoLevel   > player.lvl
  infoExp     > player.exp
  infoDamage  > player.clickDamage
  infoDps     > player.dps
  infoGold    > player.goldCollected
  infoKill    > player.killCount
*/
// const infoDamage  = document.getElementsByName('infoDamage'); 
// const infoDps     = document.querySelector('.infoDps'); 
// const infoGold    = document.getElementsByName('infoGold');
// const infoKill    = document.querySelector('.infoKill'); 
const infoLevel   = document.querySelector('.infoLevel');
const infoExp     = document.querySelector('.infoExp');
const infoDamage  = document.querySelector('.infoDamage');
const infoDps     = document.querySelector('.infoDps');
const infoGold    = document.querySelector('.infoGold');
const infoKill    = document.querySelector('.infoKill');


// here will be displayed the enemy hp
const enemyHpData = document.querySelector('.enemyHpData'); 
const percent     = document.querySelector('.percent');
let widthPer    = 100; 

// dom element heroes
const unlock = document.getElementsByClassName('unlock'); 


const heroLvlUp = document.getElementsByClassName('heroLvlUp');
const heroesLvlText = document.getElementsByClassName('heroesLvlText');
const heroesDps = document.getElementsByClassName('heroesDps');
const heroesGold = document.getElementsByClassName('heroesGold');




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

function Enemy(name, hp, gold){
  this.name = name; 
  this.hp = hp; 
  this.hpMax = hp; 
  this.gold = gold; 
}
checkForNewEnemy();

// hero list Crono, Lucca, Marle, Frog, Robo, Ayla, Magus, Spekkio, Schala, Melchior, Gaspar
let heroes = [
  {
    "id": 0, 
    "active": false,
    // need to rename to goldToUnlock,
    unlock: 10, 
    "hero": "Crono", 
    lvl: 1, 
    dps: function p() {return 0.5 * this.lvl}, 
    lvlUpGold: function x(){ return (this.unlock * this.lvl)*1.5},
    test: this.lvl * this.atk
    // todo : implement weapons
  }, 
  {
    "id": 1, 
    "active": false,
    // need to rename to goldToUnlock,
    unlock: 20, 
    "hero": "Lucca", 
    lvl: 1, 
    dps: function p() {return 1 * this.lvl}, 
    lvlUpGold: function x(){ return (this.unlock * this.lvl)*1.5},
    test: this.lvl * this.atk
    // todo : implement weapons
  }
];


function statsUpdate(){
  infoLevel.textContent   = 'Current level: ' + player.lvl;
  infoExp.textContent     = 'InfoExp: ' + player.exp;
  infoDamage.textContent  = 'Current click Damage: ' + player.clickDamage;
  infoDps.textContent     = 'Current DPS: ' + player.dps;
  infoGold.textContent    = 'Current Gold: ' + player.goldCollected;
  infoKill.textContent    = 'Current Kills: ' + player.killCount;
}

statsUpdate();

// ********************** START GAME 
checkForNewEnemy(); 
refreshData(); 

// ********************** initialiaze stuff
for(let i = 0; i < heroes.length; i++){
  // hero level up button 
  heroLvlUp[i].addEventListener('click', ()=>{
    if(heroes[i].active == true && player.goldCollected >heroes[i].lvlUpGold()){
      heroes[i].lvl += 1; 
      player.dps += heroes[i].dps();
      player.goldCollected -= heroes[i].lvlUpGold();
      heroesLvlText[i].textContent = `Level: ${heroes[i].lvl}`;
      heroesDps[i].textContent = `Dps: ${heroes[i].dps()}`;
      heroesGold[i].textContent = `Gold: ${heroes[i].lvlUpGold()}`;
    }
    // console.log(heroes[i].lvl, player.dps)
  })
  
  // hero unlock button 
  unlock[i].addEventListener('click', ()=>{
    if(heroes[i].active == false){
      if(player.goldCollected >= heroes[i].unlock){
        unlockHero(i)
        console.log(heroes[i].hero + ' is unlocked')
      }
    }
  })
}


function unlockHero(value){
  heroes[value].active = true;
  player.goldCollected -= heroes[value].unlock; 
  unlock[value].style.display = 'none'; 
  // active the stats 
  heroesLvlText[value].textContent = `Level: ${heroes[value].lvl}`;
  heroesDps[value].textContent = `Dps: ${heroes[value].dps()}`;
  heroesGold[value].textContent = `Gold: ${heroes[value].lvlUpGold()}`;
}


function dpsHeroes(){
  // WRONG
  // function to add damage from heroes to player
  player.dps += heroes[0].dps()
}


/*
************************** CLICK
************************** CLICK
************************** CLICK
*/
// -> clickdamage + critical 
function criticalDamage(){
  let crit = 0; 
  let kill = Math.floor(Math.random()*5); 
  if(kill % 3 == 0){
    crit = Math.floor(Math.random()*player.clickDamage)
  }
  return crit; 
}

clickButton.addEventListener('click', ()=>{
  let crt = criticalDamage();
  enemy.hp -= player.clickDamage + crt;
  // console.log(enemy.hp)
  enemyHpData.textContent = `Enemy HP: ${enemy.hp}`; ;
  animationBar(crt);
  if(enemy.hp <= 0){
    checkForNewEnemy(); 
    player.killCount++;
  }
})

function refreshData(){
  // checkForEnableHeroes();
  // statsUpdate();
  enemyHpData.textContent = `Enemy HP: ${enemy.hp}`; 
  // infoDamage[0].textContent = `current dmg: ${player.clickDamage}`;
  // infoGold[0].textContent = `current gold: ${player.goldCollected}`; 
  // killCount.textContent = `current gold: ${player.killCount}`; 
}

function animationBar(crt){
  widthPer -= (100*player.clickDamage+crt)/enemy.hpMax; 
  percent.style.width = widthPer + '%'; 
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

// check for enemy and create one
function checkForNewEnemy(){
  if(!enemyInTheField){
    enemy = new Enemy("Random", 20,  1); 
    enemyInTheField = true; 
    console.log(enemyInTheField + ' || Create new enemy');
  }
  else if(enemyInTheField && enemy.hp <= 0){
    widthPer = 100; 
    percent.style.width = widthPer + '%'; 
    enemy.gold = Math.floor(Math.random()*3); 
    player.goldCollected += enemy.gold; 
    enemyInTheField = false;
    console.log(enemyInTheField + ' || Enemy Killed');

  }
}


setInterval(() => {
  checkForNewEnemy(); 
  refreshData(); 
  console.log('interval')
  enemy.hp -= player.dps; 
  // FIXME  - this is for trying to show the number change each time with dps
  // for(let i = 2; i>0; i--){
  //   enemy.hp -= 1
  // }

  // Each 1000 milliseconds check for enemy in the field
}, 1000);

