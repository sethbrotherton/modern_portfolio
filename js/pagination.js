
// Divides lists into 10s, displaying one 10s at a time
function showPage(pageNumber, list) {
  for (var i = 0; i < list.length; i++) {
    list[i].style.display = 'none';
  }
  for (var i = ((pageNumber * 10) - 10); i < (pageNumber * 10) && i >= ((pageNumber * 10) - 10); i++) {
    if (list[i]) {
      list[i].style.display = 'block';
    }
  }
}

// making a list, and calling the showPage function with it
var studentList = $('.student-item');
showPage(1, studentList);

// creating an unordered list of pagination links and appending them
function appendPageLinks(list) {
  var paginationDiv = document.createElement('div');
  paginationDiv.classList.add('pagination');
  var paginationUl = document.createElement('ul');
  paginationDiv.appendChild(paginationUl);
// looping through how many groups of tens there are and creates a  clickable pagination link for each one
  for (var i = 0; i <= (list.length / 10); i++) {
    var paginationLi = document.createElement('li');
    paginationUl.appendChild(paginationLi);
    var listAnchor = document.createElement('a');
    paginationLi.appendChild(listAnchor);
    var anchorText = document.createTextNode([i + 1]);
    listAnchor.appendChild(anchorText);
    listAnchor.addEventListener('click', function (event) {
      showPage(event.target.innerHTML, list);
    });
  }
  document.body.appendChild(paginationDiv);
}
appendPageLinks(studentList);

// dynamically adds a search input and button
function addSearch() {
  var search = document.createElement('div');
  search.classList.add('student-search');
  var searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = "Search for Students...";
  search.appendChild(searchInput);
  var searchButton = document.createElement('button');
  searchButton.innerHTML = "search";
  searchButton.type = 'submit';
  search.appendChild(searchButton);
  $('.page-header').prepend(search);
}
addSearch();


var filteredStudents = [];
var searchBar = $('.student-search');
// adding event listener to search bar, to display matching results automatically
$('.student-search').bind('keyup submit', function(e) {
  var entry = e.target.value.toLowerCase();
  var listOfStudentsDetails = $('li.student-item > .student-details');
  var listOfStudents = $('li.student-item');
  filteredStudents = [];
  $('.noResultsDisplay').remove();
  for(var i = 0; i < listOfStudents.length; i++) {
    if(listOfStudentsDetails[i].textContent.toLowerCase().indexOf(entry) != -1) {
      listOfStudents[i].style.display = 'block';
      filteredStudents.push(listOfStudents[i]);
    } else {
      listOfStudents[i].style.display = 'none';
    }
  }
  $('.pagination').remove();
  showPage(1, filteredStudents);
  appendPageLinks(filteredStudents);
  noResultsFunc();
});
$('.page-header').prepend(searchBar);

// appends a no results message if there are no matches to search input
function noResultsFunc() {
  if(filteredStudents.length === 0) {
    var noResults = $('<h1></h1>').text('Sorry, no results were found.').addClass('noResultsDisplay');
    $('.student-list').prepend(noResults);
  } else {
    $('.noResultsDisplay').remove();
  }
}
