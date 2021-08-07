const nav = document.querySelector('.header');
const mainTable = document.querySelector('main_table');
const mainThead = document.querySelector('.main_thead');
const mainTbody = document.querySelector('.main_tbody');
const mainCaption = document.querySelector('.caption_koUniv');
const tbodyTr = document.querySelectorAll('.main_tbody > tr');
const detailBox = document.querySelector('.detail_mainBox');
let lastClicked;

window.onload = getData()
.then(displayTable);

const resp = [];

async function getData(){
    const urlString = window.location.href;
    const url = new URL(urlString);
    const selectedOptions = {
        koUniv : url.searchParams.get("koUniv").trim(),
        continent : url.searchParams.get("continent").trim().split(', '),
        country : url.searchParams.get("country").trim().split(', '),
    }
    console.log(selectedOptions.koUniv,selectedOptions.continent, selectedOptions.country);
    const conditions = {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(selectedOptions)
    }
    await fetch('/getTables', conditions)
    .then(Blob => Blob.json())
    .then(data => resp.push(...data));
}

async function displayTable(){
    const tableHTML = [];
    const urlString = window.location.href;
    const url = new URL(urlString);
    for (var i=0; i<resp.length; i++){
        tableHTML.push(
        `<tr>
            <td>${resp[i]['continent']}</td>
            <td>${resp[i]['country']}</td>
            <td>${resp[i]['forUniv']}</td>
            <td>${resp[i]['TO']}</td>
            <td>${resp[i]['period']}</td>
        </tr>`)
    }
    const html = tableHTML.join('');
    mainTbody.innerHTML = html;
    mainCaption.innerHTML = `${url.searchParams.get("koUniv").trim()}<span>학교</span>`
};
function accordion(){
    if (this.classList.contains('open') == true){
        this.classList.remove('open');
        detailBox.classList.remove('open');
    } else {
        for(var i=0; i<tbodyTr.length;i++){
            if (tbodyTr[i].classList.contains('open')){
                tbodyTr[i].classList.remove('open');
                detailBox.classList.remove('open');
            }
        }
        const trCoords = this.getBoundingClientRect();
        const trBottom = trCoords.bottom;
        this.classList.add('open');
        detailBox.classList.add('open');
        detailBox.style.setProperty('top', `${trBottom}px`)
    }
};
tbodyTr.forEach(tr => tr.addEventListener('click', accordion));