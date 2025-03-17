// Fetch and Display Members
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        currentMembers = members; // Store members globally for filtering
        displayGridView(members); // Default view is Grid
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

let currentMembers = [];

function displayGridView(members) {
    const container = document.getElementById('business-list');
    container.innerHTML = '';
    container.classList.remove('list-view');
    container.classList.add('grid-view');

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('business-card');
        card.innerHTML = `
            <a href="${member.website}" target="_blank"><img src="images/${member.image}" alt="${member.name}">
            </a>
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.level)}</p>
        `;
        container.appendChild(card);
    });
}

function displayListView(members) {
    const container = document.getElementById('business-list');
    container.innerHTML = '';
    container.classList.remove('grid-view');
    container.classList.add('list-view');

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Membership Level</th>
            </tr>
        </thead>
        <tbody>
            ${members.map(member => `
                <tr>
                    <td>${member.name}</td>
                    <td>${member.address}</td>
                    <td>${member.phone}</td>
                    <td><a href="${member.website}" target="_blank">${member.website}</a></td>
                    <td>${getMembershipLevel(member.level)}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    container.appendChild(table);
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

// Toggle Views
document.getElementById('grid-view-btn').addEventListener('click', () => displayGridView(currentMembers));
document.getElementById('list-view-btn').addEventListener('click', () => displayListView(currentMembers));

// Initialize
fetchMembers();