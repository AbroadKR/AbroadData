const menu = document.querySelectorAll('.header_nav > li');
const user = document.querySelector('.header_signup > li');


function dropdown() {
    this.classList.add('dropdown');
}
function resetDropdown(){
    this.classList.remove('dropdown');
}

menu.forEach(li => li.addEventListener('mouseover', dropdown));
menu.forEach(li => li.addEventListener('mouseleave', resetDropdown))
user.addEventListener('mouseover', dropdown);
user.addEventListener('mouseleave', resetDropdown);
