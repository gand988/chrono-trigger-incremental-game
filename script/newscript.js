// DOM > initialize enemy picture 
let click           = document.querySelector('.enemyPicture');    // click event on enemy portrait
// DOM > initialize player stats 
const infoLevel     = document.querySelector('.infoLevel');       // text content
const infoExp       = document.querySelector('.infoExp');         // text content
const infoDamage    = document.querySelector('.infoDamage');      // text content
const infoDps       = document.querySelector('.infoDps');         // text content
const infoGold      = document.querySelector('.infoGold');        // text content
const infoKill      = document.querySelector('.infoKill');        // text content
// DOM > initialize heroes stuff
const heroGold      = document.querySelectorAll('.heroGold');     // Gold to levelup
const heroLvlUp     = document.querySelectorAll('.heroLvlUp');    // button
const unlockButton  = document.querySelectorAll('.unlockButton'); // button
const heroDps       = document.querySelectorAll('.heroDps');      // text content
const heroesLvlText = document.querySelectorAll('.heroesLvlText');      // text content
// DOM > initialize enemy stuff
const enemyName     = document.querySelector('.enemyName');       // text content
const enemyHpData   = document.querySelector('.enemyHpData');     // text content
const percent       = document.querySelector('.percent');         // enemy Hp bar behind the enemy hp value 'enemyHpData' 

let   enemy;                  // variable to create the enemy
let   widthPer      = 100;    // width background animation bar enemy hp 

/* 
  All the stats are here
  lvl              // TODO : level will change when exp goal will be completed
  exp              // TODO : need an exp formula 
  clickDamage      // TODO : find a way to increase the click damage 
  dps              // all active heroes dps will add here
  goldCollected    // gold dropped from enemies
  killCount        // after each kill add +1
*/

let player = {
  lvl: 1,
  exp: 0,
  clickDamage: 5, 
  dps: 0, 
  // goldCollected: 0, 
  goldCollected: 100, 
  killCount: 0
}
/**
 * 
 * Hero list: 
 * Crono, Lucca, Marle, Frog, Robo, Ayla, Magus, Spekkio, Schala, Melchior, Gaspar
 */
let heroes = [
  {
    "id": 0, 
    "active": false,
    goldToUnlock: 10, 
    "hero": "Crono", 
    lvl: 1, 
    dps: 0.5,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    test: this.lvl * this.atk
    // todo : implement weapons
  }, 
  {
    "id": 1, 
    "active": false,
    goldToUnlock: 20, 
    "hero": "Lucca", 
    lvl: 1, 
    dps: 1,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    test: this.lvl * this.atk
    // todo : implement weapons
  }
];

for(let i= 0; i<heroLvlUp.length; i++){
  heroLvlUp[i].addEventListener('click', ()=>{
    if(heroes[i].active && player.goldCollected >=heroes[i].lvlUpGold()){
      heroLvlUpF(i);
      console.log(`${heroes[i].hero} Level UP`);
      console.log(`Level: ${heroes[i].lvl} || DPS: ${heroes[i].dps * heroes[i].lvl} || Gold for next lvl: ${heroes[i].lvlUpGold()}`);
    }
  })
}

function heroLvlUpF(id){
  if(heroes[id].active){
    player.goldCollected -= heroes[id].lvlUpGold();
    // playerDps(id);
    heroes[id].lvl++; 
    player.dps += heroes[id].dps(heroes[id].lvl);
    updateHeroes(id);
  }
}
/**
 * Function that unlock the hero
 */

 function unlockHero(id){
  heroes[id].active = true; 
  heroLvlUp[id].disabled = false; 
  player.goldCollected -= heroes[id].goldToUnlock; 
  unlockButton[id].style.display = 'none'; 
  // display stats hero
  updateHeroes(id);
  // playerDps(id);
  player.dps += heroes[id].dps(1);
  updateStats();
  // heroLvlUp
}
function updateHeroes(id){
  heroGold[id].textContent        = `Gold: ${heroes[id].lvlUpGold()}`; 
  heroDps[id].textContent         = `Dps: ${heroes[id].dps()}`;
  heroesLvlText[id].textContent   = `Level: ${heroes[id].lvl}`;
}
for(let i=0; i<heroes.length; i++){
  unlockButton[i].addEventListener('click', ()=>{
    unlockHero(i);
  })
}
/**
 * Add heroes dps to the player
 * @param {number} id id of the hero that will be given inside a function
 */
// function playerDps(id){
//   player.dps += heroes[id].dps();
//   console.log('playerDps ' + player.dps)
// }
/**
 * Documentation Enemy
 * hpMax is used on a formula for the animation bar
 * 
 * @param {text} name name of the enemy
 * @param {integer} hp enemy hp
 * @param {integer} gold enemy gold that will drop on death
 * 
 */
function Enemy(name, hp, gold){
  this.name   = name; 
  this.hp     = hp; 
  this.hpMax  = hp; 
  this.gold   = gold; 
}
function newEnemy(){
  enemy = new Enemy('Blue Imp', 20, Math.floor(Math.random()*5));
}
/**
 * Update most of the information on screen
 */
function updateStats(){
  infoLevel.textContent   = `Current level:         ${player.lvl}`;
  infoExp.textContent     = `Current exp:           ${player.exp}`;
  infoDamage.textContent  = `Current click damage:  ${player.clickDamage}`;
  infoDps.textContent     = `Current DPS:           ${player.dps}`;
  infoGold.textContent    = `Current Gold:          ${player.goldCollected}`;
  infoKill.textContent    = `Current Kills:         ${player.killCount}`;
  
}
/**
 * Update enemy informatio on screen
 */
function updateEnemyArea(){
  enemyName.textContent   = `${enemy.name}`;
  enemyHpData.textContent = `${enemy.hp} HP`; 
}
/**
 * Animation bar enemy hp
 * @param {number} crt 
 */
function animationBar(crt){
  widthPer -= (100*player.clickDamage+crt)/enemy.hpMax; 
  percent.style.width = widthPer + '%'; 
}
/**
 * Check if the gold collected is >= the gold that is needed to unlock the hero 
 */
function checkForEnableHeroes(){
  for (let i = 0; i<heroes.length; i++){
    if(player.goldCollected >= heroes[i].goldToUnlock)
    {
      unlockButton[i].disabled = false; 
    }else{
      unlockButton[i].disabled = true; 
    }
  }
}


// *********************************************** 
// **            GAME START HERE!               ** 
// ***********************************************

newEnemy();         // create the enemy 
updateEnemyArea();
updateStats();

/**
 * Event that will deal damange to the enemy
 */
click.addEventListener('click', ()=>{
  enemy.hp -= player.clickDamage;             // deal damage to the enemey
  enemyHpData.textContent = `${enemy.hp} HP`; // update enemy hp on screen

  if(enemy.hp <= 0){
    // after each kill add : gold, killcount, exp, 
    player.goldCollected += enemy.gold; 
    player.killCount++; 
    newEnemy(); 
  }
  updateStats();
  console.log(`${enemy.hp} hp || ${player.clickDamage} dmg`)
})



setInterval(() => {
  updateStats();
  checkForEnableHeroes();

  console.log('interval')
}, 1000);


