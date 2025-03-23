document.addEventListener('DOMContentLoaded', function() {
    // Initialize i18next
    i18next.init({
        lng: localStorage.getItem('language') || 'es', // default language
        resources: translations,
        fallbackLng: 'es',
    }).then(function(t) {
        // Add language selector to header
        addLanguageSelector();
        // Initial translation
        updateContent();
    });
});

// Function to add language selector
function addLanguageSelector() {
    const headerButton = document.querySelector('.header-button');
    if (headerButton) {
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <select onchange="changeLanguage(this.value)" class="lang-select">
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
        `;
        headerButton.parentNode.insertBefore(languageSelector, headerButton);
        
        // Set initial value
        const currentLang = localStorage.getItem('language') || 'es';
        languageSelector.querySelector('select').value = currentLang;
    }
}

// Function to change language
function changeLanguage(lng) {
    localStorage.setItem('language', lng);
    i18next.changeLanguage(lng, (err, t) => {
        if (err) return console.log('Error changing language:', err);
        updateContent();
    });
}

// Function to update content
function updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = i18next.t(key);
            } else {
                element.textContent = i18next.t(key);
            }
        }
    });
} 