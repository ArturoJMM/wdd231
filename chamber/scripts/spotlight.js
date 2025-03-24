// Select the container for spotlight cards
const spotlightContainer = document.getElementById("spotlight-container");

// Fetch and display random spotlight members
async function loadSpotlights() {
  try {
    // Fetch JSON data
    const response = await fetch('data/members.json');
    const members = await response.json();

    // Filter Gold and Silver members
    const eligibleMembers = members.filter(
      member => member.level === 2 || member.level === 3
    );

    // Randomly select 2 or 3 members
    const numSpotlights = Math.floor(Math.random() * 2) + 2; 
    const selectedMembers = getRandomMembers(eligibleMembers, numSpotlights);

    // Display the selected members as cards
    displaySpotlightCards(selectedMembers);
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

// Function to randomly select members
function getRandomMembers(members, count) {
  const shuffled = [...members].sort(() => 0.5 - Math.random()); // Shuffle array
  return shuffled.slice(0, count); // Return the first 'count' members
}

// Function to display spotlight cards
function displaySpotlightCards(members) {
  spotlightContainer.innerHTML = ""; // Clear previous content

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.logo}" alt="${member.name} logo" class="spotlight-logo">
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${getMembershipLevel(member.level)}</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
    switch (level) {
        case 1:
            return 'Member';
        case 2:
            return 'Silver';
        case 3:
            return 'Gold';
        default:
            return 'Unknown';
    }
}
// Load spotlights on page load
loadSpotlights();