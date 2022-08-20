const dbGold          = document.querySelector('.dbGold');
const dbGoldInfinite  = document.querySelector('.dbGoldInfinite');
const unlockAllHeroes = document.querySelector('.unlockAllHeroes');





unlockAllHeroes.addEventListener('click', ()=>{
  for(let i = 0; i < heroes.length; i++){
    player.goldCollected += heroes[i].goldToUnlock;       // used to not have negative gold.
    unlockHero(i);
  }
})
dbGold.addEventListener('click', ()=>{
  player.goldCollected += 100; 
})
dbGoldInfinite.addEventListener('click', ()=>{
  player.goldCollected += 100**6;
})