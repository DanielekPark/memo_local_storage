/*============
 FUNCTIONS
==============*/
function supportsLocalStorage() {
  //testing to see if the browser has access to an object of local storage, tests to see if a key exists in the window and that is NOT null
  try {
    return 'localStorage' in window && window['localStorage'] !== null
  } catch (e) {
    return false
  }
}

//GETS ITEMS FROM LOCAL STORAGE
function getRecentSearches() {
  //searches variable is a string value; LOCAL STORAGE ACCEPTS ONLY STRING TYPES, IT'LL BE STORED IN AN ARRAY
  const searches = localStorage.getItem('recentSearches')

  if (searches) {
    return JSON.parse(searches) //becomes a js object
  } else {
    return []
  }
}

//ADDS TO LOCAL STORAGE
function saveSearchString(str) {
  const searches = getRecentSearches()
  if (!str || searches.indexOf(str) > -1) {
    return false
  }
  searches.push(str)
  localStorage.setItem('recentSearches', JSON.stringify(searches)) //json.stringify() converts js object or value to json
  return true
}

//REMOVES FROM LOCAL STORAGE
function removeSearches() {
  localStorage.removeItem('recentSearches')
}

//Create an li, given string contents, append to the supplied ul
function appendListItem(listElement, string) {
  const listItemElement = document.createElement('li')
  listItemElement.innerHTML = string
  listElement.appendChild(listItemElement)
}

// Empty the contents of an element (ul)
function clearList(listElement) {
  listElement.innerHTML = ''
}

/*============
 EVENT HANDLERS
==============*/
//when the page is loaded 2 of the events are set
window.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm')
  const searchBar = document.getElementById('searchBar')
  const recentSearchList = document.getElementById('recentSearchList')
  const clearButton = document.getElementById('clearStorage')

  // Initialize display list
  const recentSearches = getRecentSearches()

  for (let i = 0; i < recentSearches.length; i++) {
    appendListItem(recentSearchList, recentSearches[i])
  }

  //EVENT HANDLER FOR form element, STORES THE STRINGS AND UPDATES THE LIST
  searchForm.addEventListener('submit', function (event) {
    let searchString = searchBar.value
    if (saveSearchString(searchString)) {
      appendListItem(recentSearchList, searchString)
    }
  })

  //EVENT HANDLER FOR clear button, DELETES SEARCHES AND UPDATES THE UI
  clearButton.addEventListener('click', function (event) {
    removeSearches()
    clearList(recentSearchList)
  })
})
