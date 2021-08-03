const searchBar = document.querySelector('.searchBar');
const options = document.querySelectorAll('.options');
const triggers = document.querySelectorAll('.container');
const koUnivInput = document.querySelector('.koUnivInput');
const koUnivLists = document.querySelector('.koUnivLists');
const koUnivPopup = document.querySelector('.popup.koUniv');
const continentInput = document.querySelector('.continentInput');
const continentPopup = document.querySelector('.popup.continent');
const continentLists = document.querySelector('.continentLists');
const continentLabel = document.querySelector('.label_continent');
const countryInput = document.querySelector('.countryInput');
const countryPopup = document.querySelector('.popup.country');
const countryLists = document.querySelector('.countryLists');
const countryLabel = document.querySelector('.label_country');
const searchForm = document.querySelector('#searchForm');

const koUnivs = [];
const continents = [];
const countries = [];
const selectedContinent = [];
const selectedCountry = [];

function pop(e){
    const optionsCoords = this.getBoundingClientRect();
    const barCoords = searchBar.getBoundingClientRect();
    console.log(this);
    if (e.target.tagName == 'BUTTON'){
        return
    }
    if (this.classList.contains('koUniv')){
        koUnivInput.focus();
        koUnivPopup.classList.add('dropdown');
        koUnivPopup.style.setProperty('left', `${optionsCoords.left - barCoords.left + 25}px`);
        if (koUnivs.length == 0){
            getKoUnivs();
        };
    } else if (this.classList.contains('continent')){
        if (koUnivInput.value == ""){
            alert('재학중인 대학을 먼저 선택해주세요!')
            return 
        } else{
            continentInput.value = "어느 대륙을 선호하시나요?";
            continents.length = 0;
            selectedContinent.length = 0;
            continentPopup.classList.add('dropdown');
            continentPopup.style.setProperty('transform', `translateX(-${optionsCoords.width/3}px)`);
            getContinents()
            .then(continentDisplay);
        };
    } else if (this.classList.contains('country')){
        if (koUnivInput.value == ""){
            alert('재학중인 대학을 먼저 선택해주세요!')
        } else {
            countries.length = 0;
            selectedCountry.length=0;
            countryInput.value = "어느 국가를 선호하시나요?";
            getContriesByContinent()
            .then(countryDisplay);
            countryPopup.classList.add('dropdown');
        }
    };
};

async function getKoUnivs(){
    await fetch('/getKoUnivs')
    .then(Blob => Blob.json())
    .then(data => koUnivs.push(...data));
    console.log(koUnivs);
}

async function getContinents(){
    const selectedKoUniv = koUnivInput.value;
    const conditions = {
        method : 'POST',
        body : selectedKoUniv
    };
    await fetch('/getContinents', conditions)
    .then(Blob => Blob.json())
    .then(data => continents.push(...data));
    console.log(continents);
};

async function getCountries(){
    const selectedKoUniv = koUnivInput.value;
    const conditions = {
        method : 'POST',
        body : selectedKoUniv
    };
    await fetch('/getCountries', conditions)
    .then(Blob => Blob.json())
    .then(data => countries.push(...data));
    console.log(countries);
};

async function getContriesByContinent(){
    const contiKo = {
        selConti :selectedContinent,
        koVal : koUnivInput.value
    }
    const conditions = {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(contiKo)
    };
    await fetch('/getCountriesByContinent', conditions)
    .then(Blob => Blob.json())
    .then(data => countries.push(...data));
    console.log(countries);
};

function findKoUnivs(wordToMatch, koUnivs){
    return koUnivs.filter(univ => {
        const regex = new RegExp(wordToMatch, 'gi');
        return univ.match(regex);
    });
};

function koUnivMatches(e){
    if (this.value == ""){
        const html = "<p> 현재 재학중인 <span class=\"hl\">대학</span>을 선택해주세요</p>";
        return koUnivLists.innerHTML = html;
        
    };
    const matchKoUnivs = findKoUnivs(this.value, koUnivs);
    const html = matchKoUnivs.map(univ => {
        const regex = new RegExp(this.value, 'gi');
        const koUnivName = univ.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li class="koUnivList" tabindex = 2>${koUnivName}</li>
        `
    }).join('');
    e.preventDefault();
    koUnivLists.innerHTML = `
    <p>현재 재학중인 <span class="hl">대학</span>을 선택해주세요</p>
    ${html}
    `;
};

function continentDisplay(){
    const continentHTML = [];
    for (var i=0; i<continents.length; i++){
        continentHTML.push(`<li>${continents[i]}</li>`);
    }
    const html = continentHTML.join('')
    continentLists.innerHTML = html;
};

function countryDisplay(){
    const countryHTML = [];
    for (var i=0; i<countries.length; i++){
        countryHTML.push(`<li>${countries[i]}</li>`);
    }
    const html = countryHTML.join('')
    countryLists.innerHTML = html;
};

function unpop(e){
    if (this.childNodes[1].classList.contains('koUniv')){
        koUnivPopup.classList.remove('dropdown');
    } else if (this.classList.contains('continent')){
        continentPopup.classList.remove('dropdown');
    } else if (this.classList.contains('country')){
        countryPopup.classList.remove('dropdown');
    };
}

function hover(e){
    this.classList.add('hovered');
}
function unhover(e){
    this.classList.remove('hovered');
}

options.forEach(option => option.addEventListener('mouseenter', hover));
options.forEach(option => option.addEventListener('mouseleave', unhover));
options.forEach(trigger => trigger.addEventListener('click', pop));
triggers.forEach(trigger => trigger.addEventListener('focusout', unpop));
koUnivInput.addEventListener('change', koUnivMatches);
koUnivInput.addEventListener('keyup', koUnivMatches);
koUnivLists.addEventListener('mousedown', (e)=>{
    if (e.target.tagName == "P" || e.target.classList.contains('ignore')){
        return
    } else if(e.target.tagName == "SPAN"){
        koUnivInput.value = e.target.parentNode.textContent;
    } else {
        koUnivInput.value = e.target.textContent;
    };
});
continentLists.addEventListener('click', (e)=>{
    if (e.target.classList.contains('selected') == true){
        e.target.classList.remove('selected');
        selectedContinent.pop(e.target.textContent);
        continentInput.innerHTML = selectedContinent.join(', ');
    } else {
        e.target.classList.add('selected');
        selectedContinent.push(e.target.textContent);
        console.log(selectedContinent);
        continentInput.innerHTML = selectedContinent.join(', ');
    }
});

countryLists.addEventListener('click', function test(e){
    if (e.target.classList.contains('selected') == true){
        e.target.classList.remove('selected');
        selectedCountry.pop(e.target.textContent);
        countryInput.innerHTML = selectedCountry.join(', ');
    } else {
        e.target.classList.add('selected');
        selectedCountry.push(e.target.textContent);
        countryInput.innerHTML = selectedCountry.join(', ');
    }
})

function searchByOptions(){
    const optKoUniv = koUnivInput.value;
    const optContinent = continentInput.innerHTML;
    const optCountry = countryInput.innerHTML;
    window.location.href = `/results? + &koUniv= +${optKoUniv}+ &continent= +${optContinent}+ &country= +${optCountry}`;
}