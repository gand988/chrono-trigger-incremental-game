const enemyList = 
[
  ["Truce_Canyon_(600_A.D)","Green_Imp","Blue_Imp","Roundillo","Green_Imp","Blue_Imp","Roundillo","Green_Imp","Blue_Imp","Roundillo","Roundillo","Roundillo_Rider"],
  ["Guardia_Forest_(600_A.D)","Blue_Eaglet","Green_Imp","Roundillo","Roundillo_Rider","Blue_Eaglet","Green_Imp","Roundillo","Roundillo_Rider","Blue_Eaglet","Green_Imp","Gilded_Bellbird"],
  ["Manolia_Cathedral_(600_A.D)","Diablo","Viper","Underling_29","Mad_Bat","Naga","Diablo","Viper","Underling_29","Mad_Bat","Naga","Yakra"],
  ["Truce_Canyon_(600_A.D)","Green_Imp","Blue_Imp","Roundillo","Green_Imp","Blue_Imp","Roundillo","Green_Imp","Blue_Imp","Roundillo","Roundillo","Roundillo_Rider"],
  ["Guardia_Forest_(Present)","Gilded_Bellbird","Scarab","Amanita","Gilded_Bellbird","Scarab","Amanita","Gilded_Bellbird","Scarab","Amanita","Amanita","Gilded_Bellbird"],
];


/**
 * 
 * 
 * 
 */

 class Enemy{
  
  constructor(hp, areaLevelCounter, bossFlag, level, internalCounter){
    this.areaLevelCounter     = areaLevelCounter;
    this.name     = this.name();
    // this.hp       = hp;
    // this.hpMax    = hp;
    this.bossFlag = bossFlag;
    this.internalCounter = internalCounter; 
    this.hp       = this.calcHp();
    this.hpMax    = this.hp;
    this.gold     = this.gold(level);
    this.sprite   = this.sprite();
  }

  name(){
    let random = Math.floor(Math.random()*10)+1;
    if(this.areaLevelCounter < enemyList.length){
      return enemyList[this.areaLevelCounter][random]; 
    }else{
      // this is for infinite game.
      return enemyList[enemyList.length-1][random];
    }
  }

  calcHp(){
    let baseHp; 
    if(this.bossFlag){
      baseHp = 10*(((areaLevelCounter) + (Math.pow(1.55,(areaLevelCounter))) * (this.bossFlag * 10)));
    }else{
      baseHp = 10*(((areaLevelCounter) + (Math.pow(1.55,(areaLevelCounter)))));
    }
    // if(this.internalCounter % 5 == 0){
    //   baseHp = (baseHp * 50) / 100; 
    // }
    return baseHp; 
  }
  // https://clickerheroes.fandom.com/wiki/Formulas#Monster_Gold_Drop
  gold(level){
    let temp; 
    if (level <= 75){
      temp = Math.round((this.hp/15)*100)/100; 
    }else{
      temp = Math.pow(1025, level-75)
    }
    return temp;
  }
  
  sprite(){
    if(this.areaLevelCounter < enemyList.length){
      return `/images/${enemyList[this.areaLevelCounter][0]}/${this.name}.webp`;
    }else{
      // this is for infinite game.
      return `/images/${enemyList[enemyList.length-1][0]}/${this.name}.webp`;
    }
  }
};