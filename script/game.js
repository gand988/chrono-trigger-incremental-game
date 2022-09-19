/*
  Title         > Chrono Trigger : The incremental game. 
  Author        > Matteo 'Gand988' Zanda
  Current Ver.  > 1.0.0
*/

// DOM > initialize enemy picture 
let click           = document.querySelector('.clickButton');    // click event on enemy portrait
let enemyPicture    = document.querySelector('.enemyPicture');    // click event on enemy portrait
// DOM > initialize player stats 
const infoLevel     = document.querySelector('.infoLevel');       // text content
const infoExp       = document.querySelector('.infoExp');         // text content
const infoDamage    = document.querySelector('.infoDamage');      // text content
const infoDps       = document.querySelector('.infoDps');         // text content
const infoGold      = document.querySelector('.infoGold');        // text content
const infoKill      = document.querySelector('.infoKill');        // text content
const damageShow    = document.querySelector('.damageShow');      // the damage to the enemy
// DOM > initialize heroes stuff
const hero          = document.querySelectorAll('.hero'); 
const heroPicture   = document.querySelectorAll('.heroPicture'); 
const heroName      = document.querySelectorAll('.heroName');     // text content
const heroGold      = document.querySelectorAll('.heroGold');     // Gold to levelup
const heroDps       = document.querySelectorAll('.heroDps');      // text content
const heroesLvlText = document.querySelectorAll('.heroesLvlText');// text content
const heroLvlUp     = document.querySelectorAll('.heroLvlUp');    // button
const unlockButton  = document.querySelectorAll('.unlockButton'); // button
// DOM > initialize enemy stuff
const areaName      = document.querySelector('.areaName');        // text content
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
  // clickDamage: function x(){ return 1 + heroes[0].passive}, 
  clickDamage: function x(){if(heroes[0].active){ return 1 + heroes[0].lvl}else{return 1}}, 
  dps: 0, 
  goldCollected: 0, 
  killCount: 0
};

/**
 * 
 * 
 */
for(let i= 0; i < heroes.length; i++){
  heroLvlUp[i].addEventListener('click', ()=>{
    if(heroes[i].active && player.goldCollected >= heroes[i].lvlUpGold){
      heroLvlUpF(i);
    }
  })
  // heroes stuff
  heroName[i].textContent        = `${heroes[i].hero}`; 
}

function heroLvlUpF(id){
  if(heroes[id].active){
    player.goldCollected -= heroes[id].lvlUpGold;
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
  if((id+1) < heroes.length){
    if(hero[id+1]){}
    hero[id+1].style.display = 'block'; // fixme - need to make an if, because there are no more heroes and line 95 give error on console. @low
  }
  player.goldCollected -= heroes[id].goldToUnlock; 
  unlockButton[id].style.display = 'none'; 
  // display stats hero
  updateHeroes(id);
  player.dps += Math.round(heroes[id].dps * 100)/100;
  updateStats();
}

function updateHeroes(id){
  heroesLvlText[id].textContent   = `Level: ${heroes[id].lvl}`;
  heroGold[id].textContent        = `Gold:  ${heroes[id].lvlUpGold}`; 
  heroDps[id].textContent         = `Dps:   ${heroes[id].dps * heroes[id].lvl}`;
}

for(let i=0; i<heroes.length; i++){
  unlockButton[i].textContent = `Unlock: ${heroes[i].goldToUnlock} G`;
  unlockButton[i].addEventListener('click', ()=>{
    unlockHero(i);
  })
  heroPicture[i].src = `images/character/${heroes[i].hero}.webp`
}


// areaLevel
let baseHp  = 10; 
let areaLevelCounter  = 0;                                    // one up after 10 kill enemies + boss
let enemyCounter      = 0;                                    // counter all the enemy
let internalCounter   = 0;                                    // counter from 1 to 11
let levelCounter      = 1; 

enemy = new Enemy(baseHp,areaLevelCounter,false,levelCounter);
/**
 * FORMULAS
 * Taken from Clicker Heroes : https://clickerheroes.fandom.com/wiki/Formulas
 * HP => from level 1 to 140: 10 x (Level - 1 + 1.55^Level-1) x (isBoss x 10)
 * HP => from level 1 to 140: 10 x (1 - 1 + 1.55^1-1) x (isBoss x 10)
 * 
 */
function newEnemy(){
  if(enemy.hp <= 0){
    if(enemy.bossFlag){                   // when the boss is killed
      internalCounter = 0;                // internal counter reset 
      areaLevelCounter++;
    }
    widthPer = 0;  
    player.goldCollected += enemy.gold;   // add gold to the bank 
    player.killCount++;                   // add kill count 
    enemyCounter++;                       // enemy counter added to the list 
    internalCounter++;                    // internal counter 1-11
    levelCounter++;

    let tempBossFlag = false; 
    if(internalCounter % 11 == 0){        // every 11 enemy it's a Boss Fight  
      tempBossFlag = true; 
    }
    enemy = new Enemy(baseHp, areaLevelCounter, tempBossFlag, levelCounter, internalCounter);
    widthPer = 100;                       // reset the width of the bar
  }
  enemyPicture.src = `${enemy.sprite}`    // show on screen the enemy sprite
}

/**
 * Update most of the information on screen
 */
function updateStats(){
  infoLevel.textContent   = `Current level:         ${player.lvl}`;
  infoExp.textContent     = `Current exp:           ${player.exp}`;
  infoDamage.textContent  = `Current click damage:  ${player.clickDamage()}`;
  infoDps.textContent     = `Current DPS:           ${player.dps}`;
  infoGold.textContent    = `Current Gold:          ${player.goldCollected}`;
  infoKill.textContent    = `Current Kills:         ${player.killCount}`;
}

/**
 * Update Area & level information on screen
 */
function updateAreaLevel(){
  if(internalCounter%11 == 0 && internalCounter != 0){
    areaLevel.textContent   = `BOSS FIGHT!!!`;
  }else{
    areaLevel.textContent   = `${internalCounter} / 10`;
  }
}

/**
 * Update enemy information on screen
 * 
 * 
 * 
 */
function updateEnemyArea(){
  let temp1 = enemy.name; 
  let temp2 = enemyList[areaLevelCounter][0]; 
  temp1 = temp1.replaceAll('_', ' '); 
  temp2 = temp2.replaceAll('_', ' '); 
  areaName.textContent    = `Area ${areaLevelCounter+1} : ${temp2}`;
  enemyName.textContent   = `${temp1}`;
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
    crit = Math.floor(Math.random()*player.clickDamage())
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
    // let crit = criticalDamage(); 
    // damageShow.textContent = player.clickDamage()+crit; 
    damageShow.textContent = player.clickDamage(); 
    enemy.hp -= player.clickDamage();                      // deal damage to the enemey
    // enemy.hp -= player.clickDamage()+crit;                      // deal damage to the enemey
    // widthPer -= (100*(player.clickDamage()+crit))/enemy.hpMax; 
    widthPer -= (100*(player.clickDamage()))/enemy.hpMax; 
    // console.log(`${enemy.hp} hp || ${player.clickDamage()} dmg`)
  }
})



setInterval(() => {
  enemy.hp = Math.round((enemy.hp - player.dps)*100)/100; 
  widthPer -= (100*(player.dps))/enemy.hpMax; 
}, 1000);


