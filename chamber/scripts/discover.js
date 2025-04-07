const gridContainer = document.getElementById('discover-grid');


const dataUrl = 'data/discover_items.json';


function createDiscoverCard(item) {
    
    let card = document.createElement('article');
    card.classList.add('discover-card'); 
    let title = document.createElement('h2');
    title.textContent = item.name; 

    let figure = document.createElement('figure');
    let image = document.createElement('img');
    image.src = `images/${item.image}`; 
    image.alt = item.name;             
    image.loading = 'lazy';            
    image.width = 300;                 
    image.height = 200;                
    figure.appendChild(image);         

    let address = document.createElement('address');
    address.textContent = item.address; 

    let description = document.createElement('p');
    description.textContent = item.description; 

    let button = document.createElement('button');
    button.textContent = 'Learn More'; 

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    return card;
}

fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
        gridContainer.innerHTML = '';
        data.forEach(item => {   
            let card = createDiscoverCard(item);
            gridContainer.appendChild(card);
        });
    });

const messageArea = document.getElementById('visit-message-area');
const currentDate = Date.now();
const lastVisitSaved = localStorage.getItem('lastVisitDate');
let messageToShow = "";

if (lastVisitSaved === null) {
    messageToShow = "Welcome! Let us know if you have any questions.";
} else {
    
    const lastVisitNumber = parseInt(lastVisitSaved);
    const timeDifference = currentDate - lastVisitNumber;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(timeDifference / millisecondsPerDay);

    if (daysDifference < 1) {
        // If the difference is less than 1 (meaning 0 days), the user returned on the same day.
        messageToShow = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        // If the difference is exactly 1 day.
        messageToShow = "You last visited 1 day ago.";
    } else {
        // If more than 1 day has passed.
        // We build the message using the number of days.
        messageToShow = "You last visited " + daysDifference + " days ago.";
    }
}

if (messageArea) {
    messageArea.innerHTML = '<p>' + messageToShow + '</p>';
}

localStorage.setItem('lastVisitDate', currentDate.toString());