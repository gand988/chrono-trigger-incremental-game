const openModalChangelog  = document.querySelector('.openModalChangelog');
const changelogModal      = document.querySelector('.changelogModal');
const changelogMain       = document.querySelector('.changelogMain');


openModalChangelog.addEventListener('click', ()=>{
  changelogModal.style.display = 'block';
  changelogMain.style.display = 'block'; 
});

changelogModal.addEventListener('click', ()=>{
  changelogModal.style.display = 'none';
  changelogMain.style.display = 'none'; 
});