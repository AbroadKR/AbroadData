const table = document.querySelector('.table');
const tHead = document.querySelector('thead');
const tBody = document.querySelector('tbody');
const caption = document.querySelector('caption');

window.onload = getData()
.then(displayTable);

const resp = [];

async function getData(){
    const urlString = window.location.href;
    const url = new URL(urlString);
    const selectedOptions = {
        koUniv : url.searchParams.get("koUniv"),
        continent : url.searchParams.get("continent").split(', '),
        country : url.searchParams.get("country").split(', '),
    }
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
    console.log(html);
    tBody.innerHTML = html;
    caption.innerHTML = `${url.searchParams.get("koUniv")}`
};