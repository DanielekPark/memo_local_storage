/*==========
  SELECTED ELEMENTS
========*/ 
  const searchForm = document.getElementById('searchForm')
  const searchBar = document.getElementById('searchBar') //input 
  const recentSearchList = document.getElementById('recentSearchList') //ul
  const clearButton = document.getElementById('clearStorage') //clear button

/*==========
  EVENT LISTENERS
========*/   
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const listItem = document.createElement('li')
    listItem.textContent = searchBar.value
    //add item to local storage    
    addToLocalStorage(searchBar.value)
    recentSearchList.appendChild(listItem)
    searchBar.value = ''
  })
//REMOVES LIST ITEMS FROM THE PAGE AND FROM LOCAL STORAGE
  clearButton.addEventListener('click', function(){
    const li = document.querySelectorAll('li')
    li.forEach(item => recentSearchList.removeChild(item))
    localStorage.removeItem('list')
  }) 

window.addEventListener('DOMContentLoaded', loadItemsFromLocalStorage)

/*==========
  FUNCTIONS
========*/ 
  function getFromLocalStorage(){
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []
  } 

  function addToLocalStorage(text){
    const items = getFromLocalStorage();
    items.push(text)
    localStorage.setItem('list', JSON.stringify(items))
  }
//DISPLAYS ITEMS FROM LOCAL STORAGE
function loadItemsFromLocalStorage(){
  const items = getFromLocalStorage()
  if(items.length > 0){
      recentSearchList.innerHTML = items.map(item => `<li>${item}</li>`).join('')
  }
}