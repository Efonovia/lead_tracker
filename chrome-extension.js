let inputBtn = document.querySelector('#input-btn');
let deleteBtn = document.querySelector('#delete-btn');
let tabBtn = document.querySelector('#tab-btn');
let myLeads = [];
const inputEl = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-el');
let LI;
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage;
        render(myLeads);
}

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log(tabs);
        myLeads.push(tabs[0]["url"])
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads);
    });

});

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener('click', saveLead);

function saveLead() {
    if (inputEl.value === "") return
    myLeads.push(inputEl.value)
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    leads.forEach(lead => {
        listItems += `<li>
                <a target="_blank" href=${lead}> ${lead} </a>
                        </li>`
    });
    ulEl.innerHTML = listItems;
}