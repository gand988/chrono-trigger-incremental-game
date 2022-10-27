console.log('dbHeroes Started...')
let heroes = []; 
// Crono, Lucca, Marle, Frog, Robo, Ayla, Magus, Spekkio, Schala, Melchior, Gaspar
let heroList = [
  {
    name: 'Cat', baseCost: 5, basedps: 0,
    skills:{

    }
  },
  {
    name: 'Crono', baseCost: 20, basedps: 5
  },
  {
    name: 'Lucca', baseCost: 250, basedps: 22
  },
  {
    name: 'Marle', baseCost: 1000, basedps: 74
  },
  {
    name: 'Frog', baseCost: 4000,basedps: 245
  },
  {
    name: 'Robo', baseCost: 20000,basedps: 976
  },
  {
    name: 'Ayla', baseCost: 100000,basedps: 3725
  },
  {
    name: 'Magus', baseCost: 400000,basedps: 10859
  },
  {
    name: 'Spekkio', baseCost: 2500000,basedps: 47143
  },
  {
    name: 'Schala', baseCost: 15000000,basedps: 186900
  },
  {
    name: 'Melchior', baseCost: 100000000,basedps: 782000
  },
  {
    name: 'Tata', baseCost: 800000000,basedps: 3721000
  }
]; 

class Hero {
  constructor(name, baseCost, basedps, skills){
    this.active = false; 
    this.hero = name; 
    this.baseCost = baseCost; 
    this.lvl = 1;
    // this.lvlUpGold = this.lvlUpGold(this.lvl); 
    this.dps = this.dps(basedps);
    this.goldToUnlock = this.baseCost;
    this.sprite = this.sprite(); 
    this.skills = skills; 
  }

  // getter
  get lvlUpGold(){
    let temp; 
    if (this.lvl >= 1 && this.lvl <= 15){
      temp = Math.floor((5+this.lvl) * (Math.pow(1.07, this.lvl)))
    }else{
      temp = Math.floor((20) * Math.pow(1.07, this.lvl));
    }
    return temp;
  }

  dps(basedps){
    return basedps; 
  };

  sprite(){
    // return `/images/${enemyList[this.area][0]}/${this.name}.webp`;
  }
};

for (let i = 0; i < heroList.length; i++){
  let temp = new Hero(heroList[i].name, heroList[i].baseCost, heroList[i].basedps);
  heroes.push(temp);
}