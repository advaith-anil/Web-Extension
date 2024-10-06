const input = document.getElementById("link")
let links = []
const addUrl = document.getElementById("add")
const saveTab = document.getElementById("save")
const deleteUrl = document.getElementById("erase")
const list = document.getElementById("list")
const linksFromLS = JSON.parse(localStorage.getItem("Links"))

if (linksFromLS){
    links = linksFromLS
    displayLinks()
}

addUrl.addEventListener("click",function (){
    links.push(input.value)
    input.value = ""
    localStorage.setItem("Links",JSON.stringify(links))
    displayLinks()
})
saveTab.addEventListener("click",function (){
    chrome.tabs.query({active:true, currentWindow: true},function(tabs){
    links.push(tabs[0].url)
    localStorage.setItem("Tabs",JSON.stringify(links))
    displayLinks()
    })
})
deleteUrl.addEventListener("dblclick", function(){
    links = []
    localStorage.clear()
    displayLinks()
})
function displayLinks(){
    let listItems = ""
    for(let i=0; i<links.length; i++){
        listItems += "<li><a target='_blank' href='" + links[i] +"'>" + links[i] + "</a></li>"
    }
    list.innerHTML = listItems
}