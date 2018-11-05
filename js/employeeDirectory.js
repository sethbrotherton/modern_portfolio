// Variables selected of use for Ajax call
const $gallery = $('#gallery');
let person;
let employees;
// Ajax call of random profile generator
// 12 results of profiles of individuals from GB, US, and AU
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=gb,us,au',
  dataType: 'json',
  success: function(data) {
    employees = data.results;
    appendCardsToPage();
    addModal();
  }
});

// Function to capitalize the first letter of a string
function capitalize(str) {
  let capitalizedStr = str.charAt(0).toUpperCase() + str.substr(1);
  return capitalizedStr;
}

// Function to capitalize the first letter of each word of a string
function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (let i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   return splitStr.join(' ');
}

// Function to format the DOB provided through API, into 00/00/00 format
function formatDob(str) {
  let month = str.charAt(5) + str.charAt(6);
  let date = str.charAt(8) + str.charAt(9);
  let year = str.charAt(2) + str.charAt(3);
  let formatedDob = `${month}/${date}/${year}`;
  return formatedDob;
}

// Function below appnds a modal of individual profile clicked on to the body of the page
let arrayNum;
function addModal() {
    $cards = $('.card');
    $cards.click(function(event) {
    arrayNum = parseInt($(this).attr('id'));
    $('body').append(
      `<div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                <img class="modal-img" src="${employees[arrayNum].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employees[arrayNum].name.first} ${employees[arrayNum].name.last}</h3>
                <p class="modal-text">${employees[arrayNum].email}</p>
                <p class="modal-text cap">${employees[arrayNum].location.city}</p>
                <hr>
                <p class="modal-text">${employees[arrayNum].phone}</p>
                <p class="modal-text">${titleCase(employees[arrayNum].location.street)}, ${capitalize(employees[arrayNum].location.city)}, ${capitalize(employees[arrayNum].location.state)} ${employees[arrayNum].location.postcode}</p>
                <p class="modal-text">Birthday: ${formatDob(employees[arrayNum].dob.date)}</p>
            </div>
          </div>
          <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
          </div>
        </div>`
      );
      // Functions to add event listeners to elements of the modal
      addCloseModalEvent();
      addNextButtonEvent();
      addPrevButtonEvent();
  });
}

// Modal closes when close button is clicked
function addCloseModalEvent() {
  let $modalContainer = $('.modal-container');
  let $modalCloseButton = $('#modal-close-btn');
  $modalCloseButton.click(function () {
    $modalContainer.remove();
  });
}

// When 'next' button is clicked, the next profile appears in modal window
function addNextButtonEvent() {
  let $nextButton = $('#modal-next');
  $nextButton.click(function() {
    // to keep track of which profile is displayed
    arrayNum += 1;
    let $modalContainer = $('.modal-container');
    if (arrayNum < 12) {
      $modalContainer.remove();
      $('body').append(
        `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                  <img class="modal-img" src="${employees[arrayNum].picture.large}" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${employees[arrayNum].name.first} ${employees[arrayNum].name.last}</h3>
                  <p class="modal-text">${employees[arrayNum].email}</p>
                  <p class="modal-text cap">${employees[arrayNum].location.city}</p>
                  <hr>
                  <p class="modal-text">${employees[arrayNum].phone}</p>
                  <p class="modal-text">${titleCase(employees[arrayNum].location.street)}, ${capitalize(employees[arrayNum].location.city)}, ${capitalize(employees[arrayNum].location.state)} ${employees[arrayNum].location.postcode}</p>
                  <p class="modal-text">Birthday: ${formatDob(employees[arrayNum].dob.date)}</p>
                </div>
              </div>
              <div class="modal-btn-container">
                  <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                  <button type="button" id="modal-next" class="modal-next btn">Next</button>
              </div>
            </div>`
         );
          addCloseModalEvent();
          addNextButtonEvent();
          addPrevButtonEvent();
      } else if (arrayNum >= 12){
        // to prevent arrayNum from going above 11, thus exceeding the amount of profiles in Gallery
        arrayNum -= 1;
      }
    });
  }

  // To add event listener to 'prev' button in the modal
  function addPrevButtonEvent() {
    let $prevButton = $('#modal-prev');
    $prevButton.click(function() {
      // Decreases arrayNum to display previous profile
      arrayNum -= 1;
      let $modalContainer = $('.modal-container');
      if (arrayNum >= 0) {
        $modalContainer.remove();
        $('body').append(
          `<div class="modal-container">
              <div class="modal">
                  <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                  <div class="modal-info-container">
                    <img class="modal-img" src="${employees[arrayNum].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${employees[arrayNum].name.first} ${employees[arrayNum].name.last}</h3>
                    <p class="modal-text">${employees[arrayNum].email}</p>
                    <p class="modal-text cap">${employees[arrayNum].location.city}</p>
                    <hr>
                    <p class="modal-text">${employees[arrayNum].phone}</p>
                    <p class="modal-text">${titleCase(employees[arrayNum].location.street)}, ${capitalize(employees[arrayNum].location.city)}, ${capitalize(employees[arrayNum].location.state)} ${employees[arrayNum].location.postcode}</p>
                    <p class="modal-text">Birthday: ${formatDob(employees[arrayNum].dob.date)}</p>
                  </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
              </div>`
           );
            addCloseModalEvent();
            addNextButtonEvent();
            addPrevButtonEvent();
          } else if (arrayNum < 0) {
            // to prevent arrayNum from going below 0 and trying to display a profile that doesn't exist
            arrayNum += 1;
          }
      });
    }

// Loops through the info retrieved from ajax call and displays the info in the
// within the html specified below
let arrayOfCards = [];
function appendCardsToPage () {
  $.each(employees, function(i, person) {
    $gallery.append(`<div class="card" id="${i}">
        <div class="card-img-container">
            <img class="card-img" src="${person.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}</p>
        </div>
    </div>`);
  });
  // Pushes each employee into the 'arrayOfCards' array, to be used in modal displays
  arrayOfCards.push(employees);
}

// Appends a search input to the page
const $searchContainer = $('.search-container');
$searchContainer.append(`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>`);
const $searchInput = $('#search-input');
// Adds a keyup event to the search input, to filter cards by the name of the employee
$searchInput.on('keyup', () => {
  let search = $searchInput.val().toLowerCase();
  let cards = document.querySelectorAll('.card');
  let names = document.querySelectorAll('.card-name');
  for (let i = 0; i < $cards.length; i++) {
    if (names[i].innerHTML.indexOf(search) != -1) {
      cards[i].style.display = '';
    } else {
      cards[i].style.display = 'none';
    }
  }
});
