// DOM Elements
const landingPage = document.getElementById('landing-page');
const trackingPage = document.getElementById('tracking-page');
const trackBtn = document.getElementById('track-btn');
const trackingIdInput = document.getElementById('tracking-id');
const trackingError = document.getElementById('tracking-error');
const trackingIdDisplay = document.querySelector('.tracking-id-display');
const backToLandingBtn = document.querySelector('.back-to-landing');
const logo = document.getElementById('logo');
const statusProgress = document.getElementById('status-progress');
const carImagesContainer = document.getElementById('car-images');
const shipmentDetailsList = document.getElementById('shipment-details');
const timelineDetailsList = document.getElementById('timeline-details');
const locationDetailsList = document.getElementById('location-details');
const statusText = document.getElementById('status-text');

// Valid tracking IDs with their data
const validTrackingIds = {
    'SCA-789456123': {
        vehicle: '2024 Lexus RX 350 F Sport',
        color: 'White',
        vin: 'JTMBY7FJX0K123456',
        origin: 'San Francisco, CA, USA',
        destination: '1028 Moreno way Sacramento, CA 95838',
        status: 'In Transit',
        progress: 65,
        images: [
            {url: 'https://vehicle-images.dealerinspire.com/ca63-110004420/2T2BAMCA1SC107175/82a87b60216e702da6daa94e2b3c0b2c.jpeg', caption: 'Front View - Pre-shipment inspection'},
            {url: 'https://vehicle-images.dealerinspire.com/56fa-110004846/2T2BAMBA4SC057728/d12129012552cf72b8da881d86ee6080.jpg', caption: 'Back View'},
            {url: 'https://tmna.aemassets.toyota.com/is/image/toyota/lexus/images/models/rx/2025/technology/Lexus-RX-Technology-hero-mobile-750x672-LEX-RXF-MY25-0008.jpg?hei=672&wid=750', caption: 'Interior View - Before shipping'}
        ],
        timeline: [
            {event: 'Order Placed', date: 'June 18, 2025'},
            {event: 'Processing', date: 'June 20, 2025'},
            {event: 'Picked Up', date: 'June 21, 2025'},
            {event: 'Departed ', date: 'June 25, 2025'},
            {event: 'Estimated Arrival', date: 'July 10, 2025'}
        ],
        location: {
            status: 'In Transit',
            current: 'Port of San Francisco',
            vessel: 'MSC Diana',
            lastUpdate: new Date().toLocaleString('en-US', {timeZone: 'GMT'}),
            nextUpdate: 'June 30, 2025'
        }
    },
    'GAE-987654321': {
        vehicle: '2022 Mercedes-Benz G-Class',
        color: 'Black',
        vin: 'W1NYG6EB1NA123456',
        origin: 'Los Angeles, CA, USA',
        destination: 'Tokyo, Japan',
        status: 'Processing',
        progress: 20,
        images: [
            {url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', caption: 'Front View - Pre-shipment inspection'},
            {url: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', caption: 'Side View - Before shipping'},
            {url: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', caption: 'Interior View - Dashboard'}
        ],
        timeline: [
            {event: 'Order Placed', date: 'June 8, 2023'},
            {event: 'Processing', date: 'June 12, 2023'},
            {event: 'Estimated Pickup', date: 'June 15, 2023'},
            {event: 'Estimated Departure', date: 'June 20, 2023'},
            {event: 'Estimated Arrival', date: 'July 10, 2023'}
        ],
        location: {
            status: 'Processing',
            current: 'Los Angeles Port Facility',
            vessel: 'Not assigned yet',
            lastUpdate: 'June 12, 2023 09:15 GMT',
            nextUpdate: 'June 15, 2023'
        }
    },
    'GAE-456789123': {
        vehicle: '2023 Porsche 911 Carrera',
        color: 'Guards Red',
        vin: 'WP0AB2A96PS123456',
        origin: 'New York, NY, USA',
        destination: 'London, UK',
        status: 'Delivered',
        progress: 100,
        images: [
            {url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', caption: 'Front View - Pre-shipment'},
            {url: 'https://images.unsplash.com/photo-1580274437635-d3f54fb9a5a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', caption: 'Side View - Loading process'},
            {url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', caption: 'Interior View - Leather seats'}
        ],
        timeline: [
            {event: 'Order Placed', date: 'May 15, 2023'},
            {event: 'Processing', date: 'May 18, 2023'},
            {event: 'Picked Up', date: 'May 22, 2023'},
            {event: 'Departed Port', date: 'May 28, 2023'},
            {event: 'Arrived', date: 'June 10, 2023'},
            {event: 'Delivered', date: 'June 12, 2023'}
        ],
        location: {
            status: 'Delivered',
            current: 'London, UK',
            vessel: 'CMA CGM Marco Polo',
            lastUpdate: 'June 12, 2023 11:30 GMT',
            nextUpdate: 'N/A'
        }
    }
};

// Show tracking page with valid data
function showTrackingPage() {
    const trackingId = trackingIdInput.value.trim().toUpperCase();
    trackingError.textContent = '';
    trackingError.style.display = 'none';
    
    if (!trackingId) {
        trackingError.textContent = 'Please enter a tracking ID';
        trackingError.style.display = 'block';
        trackingIdInput.focus();
        return;
    }
    
    if (validTrackingIds[trackingId]) {
        const shipment = validTrackingIds[trackingId];
        
        // Update tracking ID display
        trackingIdDisplay.textContent = trackingId;
        
        // Update status
        statusText.textContent = shipment.status;
        statusProgress.style.width = `${shipment.progress}%`;
        
        // Update car images
        updateCarImages(shipment.images);
        
        // Update shipment details
        updateShipmentDetails(shipment);
        
        // Update timeline
        updateTimelineDetails(shipment.timeline);
        
        // Update location details
        updateLocationDetails(shipment.location);
        
        // Show tracking page
        landingPage.style.display = 'none';
        trackingPage.style.display = 'block';
        
        // Scroll to top
        window.scrollTo(0, 0);
    } else {
        trackingError.textContent = 'Tracking ID not found. Please check your ID and try again.';
        trackingError.style.display = 'block';
        trackingIdInput.focus();
    }
}

// Update car images
function updateCarImages(images) {
    carImagesContainer.innerHTML = '';
    
    images.forEach(image => {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        imageCard.innerHTML = `
            <img src="${image.url}" alt="${image.caption}">
            <div class="caption">${image.caption}</div>
        `;
        carImagesContainer.appendChild(imageCard);
    });
}

// Update shipment details
function updateShipmentDetails(shipment) {
    shipmentDetailsList.innerHTML = `
        <li><span class="label">Vehicle:</span> <span class="value">${shipment.vehicle}</span></li>
        <li><span class="label">Color:</span> <span class="value">${shipment.color}</span></li>
        <li><span class="label">VIN:</span> <span class="value">${shipment.vin}</span></li>
        <li><span class="label">Origin:</span> <span class="value">${shipment.origin}</span></li>
        <li><span class="label">Destination:</span> <span class="value">${shipment.destination}</span></li>
    `;
}

// Update timeline details
function updateTimelineDetails(timeline) {
    timelineDetailsList.innerHTML = '';
    
    timeline.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="label">${item.event}:</span> 
            <span class="value">${item.date}</span>
        `;
        timelineDetailsList.appendChild(listItem);
    });
}

// Update location details
function updateLocationDetails(location) {
    locationDetailsList.innerHTML = `
        <li><span class="label">Status:</span> <span class="value">${location.status}</span></li>
        <li><span class="label">Current Location:</span> <span class="value">${location.current}</span></li>
        <li><span class="label">Vessel:</span> <span class="value">${location.vessel}</span></li>
        <li><span class="label">Last Update:</span> <span class="value">${location.lastUpdate}</span></li>
        <li><span class="label">Next Update:</span> <span class="value">${location.nextUpdate}</span></li>
    `;
}

// Show landing page
function showLandingPage() {
    trackingPage.style.display = 'none';
    landingPage.style.display = 'block';
    
    // Clear input and error
    trackingIdInput.value = '';
    trackingError.textContent = '';
    trackingError.style.display = 'none';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Event Listeners
trackBtn.addEventListener('click', showTrackingPage);

trackingIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        showTrackingPage();
    }
});

backToLandingBtn.addEventListener('click', showLandingPage);

logo.addEventListener('click', showLandingPage);

// Initialize with a sample tracking ID