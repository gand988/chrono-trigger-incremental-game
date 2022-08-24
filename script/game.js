/*
  Title         > Chrono Trigger : The incremental game. 
  Author        > Matteo 'Gand988' Zanda
  Current Ver.  > 00.01.50
*/

// DOM > initialize enemy picture 
let click           = document.querySelector('.enemyPicture');    // click event on enemy portrait
// DOM > initialize player stats 
const infoLevel     = document.querySelector('.infoLevel');       // text content
const infoExp       = document.querySelector('.infoExp');         // text content
const infoDamage    = document.querySelector('.infoDamage');      // text content
const infoDps       = document.querySelector('.infoDps');         // text content
const infoGold      = document.querySelector('.infoGold');        // text content
const infoKill      = document.querySelector('.infoKill');        // text content
const damageShow    = document.querySelector('.damageShow');      // the damage to the enemy
// DOM > initialize heroes stuff
// const heroPicture   = document.querySelectorAll('.heroPicture');  // text content
const hero          = document.querySelectorAll('.hero'); 
const heroName      = document.querySelectorAll('.heroName');     // text content
const heroGold      = document.querySelectorAll('.heroGold');     // Gold to levelup
const heroDps       = document.querySelectorAll('.heroDps');      // text content
const heroesLvlText = document.querySelectorAll('.heroesLvlText');// text content
const heroLvlUp     = document.querySelectorAll('.heroLvlUp');    // button
const unlockButton  = document.querySelectorAll('.unlockButton'); // button
// DOM > initialize enemy stuff
const areaLevel     = document.querySelector('.areaLevel');       // text content
const enemyName     = document.querySelector('.enemyName');       // text content
const enemyHpData   = document.querySelector('.enemyHpData');     // text content
const animationBar  = document.querySelector('.animationBar');    // enemy Hp bar behind the enemy hp value 'enemyHpData' 

let   enemy;                      // variable to create the enemy
let   widthPer      = 100;        // width background animation bar enemy hp 


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
  clickDamage: 2, 
  dps: 0, 
  goldCollected: 0, 
  killCount: 0
}
/**
 * 
 * Hero list: 
 * Crono, Lucca, Marle, Frog, Robo, Ayla, Magus, Spekkio, Schala, Melchior, Gaspar
 */
// class Heroes {

// }
let heroes = [
  {
    "id": 0, 
    "active": false,
    goldToUnlock: 10, 
    "hero": "Crono", 
    lvl: 1, 
    dps: 0.2,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  }, 
  {
    "id": 1, 
    "active": false,
    goldToUnlock: 50, 
    "hero": "Lucca", 
    lvl: 1, 
    dps: 0.5,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 2,
    "active": false, 
    goldToUnlock: 100, 
    "hero": "Marle",
    lvl: 1, 
    dps: 1,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 3,
    "active": false, 
    goldToUnlock: 150, 
    "hero": "Frog",
    lvl: 1, 
    dps: 1.5,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 4,
    "active": false, 
    goldToUnlock: 200, 
    "hero": "Robo",
    lvl: 1, 
    dps: 2,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 5,
    "active": false, 
    goldToUnlock: 250, 
    "hero": "Ayla",
    lvl: 1, 
    dps: 2.5,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 6,
    "active": false, 
    goldToUnlock: 300, 
    "hero": "Magus",
    lvl: 1, 
    dps: 3,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 7,
    "active": false, 
    goldToUnlock: 350, 
    "hero": "Spekkio",
    lvl: 1, 
    dps: 3.5,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 8,
    "active": false, 
    goldToUnlock: 400, 
    "hero": "Schala",
    lvl: 1, 
    dps: 4,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 9,
    "active": false, 
    goldToUnlock: 450, 
    "hero": "Melchior",
    lvl: 1, 
    dps: 4.5,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  },
  {
    "id": 10,
    "active": false, 
    goldToUnlock: 500, 
    "hero": "Gaspar",
    lvl: 1, 
    dps: 5,
    lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
    weapons: []
  }
  // ,
  // {
  //   "id": 0,
  //   "active": false, 
  //   goldToUnlock: 0, 
  //   "hero": "",
  //   lvl: 1, 
  //   dps: 0,
  //   lvlUpGold: function x(){ return (this.goldToUnlock * this.lvl)*1.5},
  //   weapons: []
  // }
];

for(let i= 0; i<heroLvlUp.length; i++){
  heroLvlUp[i].addEventListener('click', ()=>{
    if(heroes[i].active && player.goldCollected >=heroes[i].lvlUpGold()){
      heroLvlUpF(i);
      console.log(`${heroes[i].hero} Level UP`);
      console.log(`Level: ${heroes[i].lvl} || DPS: ${heroes[i].dps * heroes[i].lvl} || Gold for next lvl: ${heroes[i].lvlUpGold()}`);
    }
  })
  // heroes stuff
  heroName[i].textContent        = `${heroes[i].hero}`; 
}

function heroLvlUpF(id){
  if(heroes[id].active){
    player.goldCollected -= heroes[id].lvlUpGold();
    heroes[id].lvl++; 
    player.dps += heroes[id].dps;
    updateHeroes(id);
  }
}
/**
 * Function that unlock the hero
 */

function unlockHero(id){
  heroes[id].active = true; 
  heroLvlUp[id].disabled = false; 
  hero[id+1].style.display = 'block'; 
  player.goldCollected -= heroes[id].goldToUnlock; 
  unlockButton[id].style.display = 'none'; 
  // display stats hero
  updateHeroes(id);
  player.dps += Math.round(heroes[id].dps * 100)/100;
  updateStats();
}
function updateHeroes(id){
  heroGold[id].textContent        = `Gold: ${heroes[id].lvlUpGold()}`; 
  heroDps[id].textContent         = `Dps: ${(Math.round(heroes[id].dps*100)/100) * heroes[id].lvl}`;
  heroesLvlText[id].textContent   = `Level: ${heroes[id].lvl}`;
}
for(let i=0; i<heroes.length; i++){
  unlockButton[i].addEventListener('click', ()=>{
    unlockHero(i);
  })
}
/**
 * Documentation Enemy
 * hpMax is used on a formula for the animation bar
 * 
 * @param {text} name name of the enemy
 * @param {integer} hp enemy hp
 * @param {integer} gold enemy gold that will drop on death
 * 
 */
// function Enemys(name, hp, gold){
//   this.name   = name; 
//   this.hp     = hp; 
//   this.hpMax  = hp; 
//   this.gold   = gold; 
// }

// TODO  fix the heroes to class + 
const enemyList = [
  'Blue Eaglet', 
  'Green Imp',
  'Roundillo', 
  'Roundillo Rider',
  'Blue Eaglet', 
  'Green Imp',
  'Blue Eaglet', 
  'Green Imp',
  'Roundillo', 
  'Roundillo Rider'
];
/**
 * Enemy 
 * 
 * 
 */
class Enemy{
  constructor(hp){
    this.name     = this.name(); 
    // this.level    = level; 
    this.hp       = hp; 
    this.hpMax    = hp;
    this.gold     = this.gold(); 
    this.bossFlag = false; 
  }
  name(){
    let random = Math.floor(Math.random()*enemyList.length);
    return enemyList[random]; 
  }
  gold(){
    // need a good formula for this
    return Math.floor((this.hpMax * 20)/100) ;
  }
}
let baseHp  = 10; 
let areaLevelCounter  = 1; 
let enemyCounter      = 0; 
let internalCounter   = 0;

enemy = new Enemy(baseHp);

function newEnemy(){
  if(enemy.hp <= 0){
    if(enemy.bossFlag){
      enemy.bossFlag = false;
      internalCounter = 0; 
    }
    widthPer = 0; 
    player.goldCollected += enemy.gold; 
    player.killCount++; 
    enemyCounter++; 
    internalCounter++; 
    if(internalCounter%5 == 0){
      baseHp = baseHp + Math.floor(((baseHp * 50)/100)); 
    }
    if(internalCounter % 11 == 0){
      let temp = baseHp; 
      temp = (temp * 250)/100; 
      enemy = new Enemy(temp);
      enemy.bossFlag = true; 
      // console.log(enemy.hp);
    }else{
      enemy = new Enemy(baseHp)
    }
    console.log(`${enemy.hp} || ${enemyCounter} || ${internalCounter}`)
    // enemy = new Enemy('Blue Imp', 20, Math.floor(Math.random()*5));
    widthPer = 100; 
  }
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
 * Update Area & level information on screen
 */
function updateAreaLevel(){
  if(internalCounter%11 == 0 && internalCounter != 0){
    areaLevel.textContent   = `Level: ${enemyCounter} - BOSS FIGHT!!!`;
  }else{
    areaLevel.textContent   = `Level: ${enemyCounter}`;
  }
}

/**
 * Update enemy information on screen
 */
function updateEnemyArea(){
  enemyName.textContent   = `${enemy.name}`;
  enemyHpData.textContent = `${enemy.hp} HP`; 
}
/**
 * Animation bar enemy hp
 * @param {number} crt 
 */
function updateAnimationBar(){
  animationBar.style.width = widthPer + '%'; 
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

function updateElements(){

  setInterval(() => {
    updateStats();
    updateEnemyArea();
    updateAreaLevel();
    checkForEnableHeroes();
    
    updateAnimationBar()
    if(enemy.hp <=0){
      newEnemy();
      widthPer = 100; 
    }
    // console.log('90millisecond')
  }, 90);

}


// *********************************************** 
// **            GAME START HERE!               ** 
// ***********************************************

newEnemy();         // create the enemy 
updateElements();   // update elements with a interval of 90milliseconds

function criticalDamage(){
  let crit = 0; 
  let x = Math.floor(Math.random()*5); 
  if(x % 3 == 0){
    crit = Math.floor(Math.random()*player.clickDamage)
  }
  return crit; 
}

/**
 * Event that will deal damange to the enemy
 */
click.addEventListener('click', ()=>{
  // debug One Kill
  if(oneHitKill.checked){
    enemy.hp = 0
  }else{
    let crit = criticalDamage(); 
    damageShow.textContent = player.clickDamage+crit; 
    enemy.hp -= player.clickDamage+crit;                      // deal damage to the enemey
    widthPer -= (100*(player.clickDamage+crit))/enemy.hpMax; 
    // console.log(`${enemy.hp} hp || ${player.clickDamage} dmg`)
  }
})



setInterval(() => {
  enemy.hp = Math.round((enemy.hp - player.dps)*100)/100; 
  widthPer -= (100*(player.dps))/enemy.hpMax; 
}, 1000);


