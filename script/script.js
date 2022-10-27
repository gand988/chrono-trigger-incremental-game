const openModalChangelog  = document.querySelector('.openModalChangelog');
const changelogModal      = document.querySelector('.changelogModal');
const changelogMain       = document.querySelector('.changelogMain');
let lightDarkMode         = document.querySelector('.lightDarkMode');
let save                  = document.querySelector('.save'); 
let darkMode              = false; 

openModalChangelog.addEventListener('click', ()=>{
  changelogModal.style.display = 'block';
  changelogMain.style.display = 'block'; 
});

changelogModal.addEventListener('click', ()=>{
  changelogModal.style.display = 'none';
  changelogMain.style.display = 'none'; 
});
window.addEventListener('load', ()=>{
  darkMode=localStorage.getItem('darkMode');
  isDarkModeOn();
});
lightDarkMode.addEventListener('click', ()=>{
  isDarkModeOn();
});
function isDarkModeOn(){
  if(darkMode == false){
    document.body.classList.remove('lightMode');
    document.body.classList.add('darkMode');
    darkMode= true; 
  }else if(darkMode == true){
    document.body.classList.remove('darkMode');
    document.body.classList.add('lightMode');
    darkMode = false; 
  }
}
save.addEventListener('click', ()=>{
  localStorage.setItem('darkMode',darkMode)
});


