// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of the content
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            modals[i].style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
};

// Set the current date in the hidden timestamp field
document.addEventListener('DOMContentLoaded', function() {
    // Update the year in the footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Update the last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = new Date(document.lastModified).toLocaleDateString('en-US');
    }
    
    // Set timestamp in the form if we're on the join page
    const timestampInput = document.getElementById('timestamp');
    if (timestampInput) {
        const now = new Date();
        timestampInput.value = now.toISOString();
    }
    
    // Process URL parameters for the thank you page
    const formDataContainer = document.getElementById('formData');
    if (formDataContainer && window.location.href.includes('thankyou.html')) {
        displayFormData();
    }
});

// Function to display form data on the thank you page
function displayFormData() {
    const params = new URLSearchParams(window.location.search);
    const formData = document.getElementById('formData');
    
    // Check if there's form data
    if (params.size > 0) {
        const requiredFields = [
            { param: 'firstName', label: 'First Name' },
            { param: 'lastName', label: 'Last Name' },
            { param: 'email', label: 'Email' },
            { param: 'phone', label: 'Mobile Phone' },
            { param: 'businessName', label: 'Business/Organization' },
            { param: 'timestamp', label: 'Application Date and Time' }
        ];
        
        // Create elements for each required field
        requiredFields.forEach(field => {
            if (params.has(field.param)) {
                const value = params.get(field.param);
                
                // Format timestamp if needed
                let displayValue = value;
                if (field.param === 'timestamp' && value) {
                    try {
                        const date = new Date(value);
                        displayValue = date.toLocaleString('en-US');
                    } catch (e) {
                        console.error("Error formatting timestamp:", e);
                    }
                }
                
                const item = document.createElement('div');
                item.className = 'submission-item';
                
                const label = document.createElement('div');
                label.className = 'submission-label';
                label.textContent = field.label + ':';
                
                const valueEl = document.createElement('div');
                valueEl.className = 'submission-value';
                valueEl.textContent = displayValue;
                
                item.appendChild(label);
                item.appendChild(valueEl);
                formData.appendChild(item);
            }
        });
        
        // If no data, show a message
        if (formData.children.length === 0) {
            formData.textContent = 'No form data found.';
        }
    } else {
        formData.textContent = 'No form data found.';
    }
}