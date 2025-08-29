// Rain effect functionality
let currentRainAmount = 2;

function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    const raindropCount = currentRainAmount; // Use current setting
    
    for (let i = 0; i < raindropCount; i++) {
        setTimeout(() => {
            createRaindrop(rainContainer);
        }, i * (3000 / Math.max(raindropCount, 1))); // Adjust stagger timing
    }
}

function createRaindrop(container) {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    
    // Random positioning
    raindrop.style.left = Math.random() * 100 + '%';
    
    // Random animation duration for varied speeds
    const duration = Math.random() * 1.5 + 0.8; // 0.8-2.3 seconds
    raindrop.style.animationDuration = duration + 's';
    
    // Calculate raindrop length based on speed (faster = longer)
    const speed = 1 / duration; // Higher speed = higher number
    const baseLength = 15;
    const lengthMultiplier = 0.3 + speed * 2.5; // More dramatic scaling
    const raindropLength = baseLength * lengthMultiplier;
    
    // Apply dynamic length
    raindrop.style.height = raindropLength + 'px';
    
    // No delay - raindrops start falling immediately
    raindrop.style.animationDelay = '0s';
    
    container.appendChild(raindrop);
    
    // Remove raindrop after animation completes with extra buffer
    setTimeout(() => {
        if (raindrop.parentNode) {
            raindrop.parentNode.removeChild(raindrop);
        }
    }, (duration + 2) * 1000);
}

// Continuously create new raindrops
function startRain() {
    createRain();
    setInterval(createRain, 5000); // Create new batch every 5 seconds
}

// Settings functionality
function initializeSettings() {
    const settingsButton = document.getElementById('settingsButton');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');
    const rainSlider = document.getElementById('rainAmount');
    const rainValue = document.getElementById('rainValue');
    
    // Check if all elements exist
    if (!settingsButton || !settingsPanel || !closeSettings || !rainSlider || !rainValue) {
        console.error('Some settings elements not found:', {
            settingsButton: !!settingsButton,
            settingsPanel: !!settingsPanel,
            closeSettings: !!closeSettings,
            rainSlider: !!rainSlider,
            rainValue: !!rainValue
        });
        return;
    }
    
    console.log('Settings initialized successfully');
    
    // Initialize slider and display value to match currentRainAmount
    rainSlider.value = currentRainAmount;
    rainValue.textContent = currentRainAmount;
    
    // Toggle settings panel
    settingsButton.addEventListener('click', () => {
        console.log('Settings button clicked');
        settingsPanel.classList.toggle('active');
        console.log('Settings panel active:', settingsPanel.classList.contains('active'));
    });
    
    // Close settings panel
    closeSettings.addEventListener('click', () => {
        console.log('Close button clicked');
        settingsPanel.classList.remove('active');
    });
    
    // Update rain amount
    rainSlider.addEventListener('input', (e) => {
        currentRainAmount = parseInt(e.target.value);
        rainValue.textContent = currentRainAmount;
        
        // Clear existing rain and restart with new amount
        const rainContainer = document.getElementById('rainContainer');
        rainContainer.innerHTML = '';
        startRain();
    });
    
    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsButton.contains(e.target)) {
            settingsPanel.classList.remove('active');
        }
    });
}

// Start rain when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    startRain();
    initializeSettings();
    
    // Test if settings button is clickable
    const testButton = document.getElementById('settingsButton');
    if (testButton) {
        console.log('Settings button found, adding test click');
        testButton.addEventListener('click', () => {
            console.log('Test click detected');
        });
    } else {
        console.error('Settings button not found during initialization');
    }
});
