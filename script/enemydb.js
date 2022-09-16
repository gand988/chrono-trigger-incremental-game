// TODO  fix the heroes to class + 
// const enemyList = [
//   'Blue Eaglet', 
//   'Green Imp',
//   'Roundillo', 
//   'Roundillo Rider',
//   'Blue Eaglet', 
//   'Green Imp',
//   'Blue Eaglet', 
//   'Green Imp',
//   'Roundillo', 
//   'Roundillo Rider'
// ];

const enemyList = [
  {
    id: "000", 
    nameArea: "Forest", 
    list: [
      {
        enemy_id: "blue_eaglet", 
        enemyName: "Blue Eaglet", 
        skin: `url(/data/img/area/${this.id}/${this.enemy_id}.png)`
      },
      {
        enemy_id: "blue_eaglet", 
        enemyName: "Blue Eaglet", 
        skin: `url(/data/img/area/${this.id}/${this.enemy_id}.png)`
      }
    ]
  }
];

// need to pass the area
/* 
  each 10 enemies + 1 boss the area change 
  1 -> 2
  each area have a list of 10 enemies + 1/2 bosses  ## array + object 

*/
/* 
  [
    [
      // the id, if needed is done by the id of the array
      // 0        will be alway the name area
      // 1-10     enemy list, name need to be like the one on the file of the image so i 
                  can use it for more things.
                  need to find a way to manipulate the text
      // 11-12    boss 
      area name
      enemy
      boss 
    ]
  ]

  gold is not only dropped on kill but random on click (less value)
*/
const listArea = [
  ['foresta', 'Blue Eaglet', 'Green Imp','Roundillo', 'Roundillo Rider','Blue Eaglet', 'Green Imp','Blue Eaglet', 'Green Imp','Roundillo', 'Roundillo Rider', "BOSS"],
]
class EnemyTest{
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
/* 
need the area of fight
  in this area there are enemies 
  area
    enemy 
    boss

*/

