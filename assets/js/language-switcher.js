document.addEventListener('DOMContentLoaded', function() {
    // Initialize i18next
    i18next.init({
        lng: localStorage.getItem('language') || 'es', // default language
        resources: translations,
        fallbackLng: 'es',
    }).then(function(t) {
        // Set initial value for all language selectors
        const currentLang = localStorage.getItem('language') || 'es';
        document.querySelectorAll('.lang-select').forEach(selector => {
            selector.value = currentLang;
        });
        
        // Initial translation
        updateContent();
    });
});

// Function to change language
function changeLanguage(lng) {
    localStorage.setItem('language', lng);
    i18next.changeLanguage(lng, (err, t) => {
        if (err) return console.log('Error changing language:', err);
        
        // Update all language selectors
        document.querySelectorAll('.lang-select').forEach(selector => {
            selector.value = lng;
        });
        
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
    
    // Update page title for specific pages
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    if (filename === 'team.html') {
        document.getElementById('page-title').innerText = i18next.t('team.title') + ' - FXperto';
    } else if (filename === 'index.html' || filename === '') {
        document.getElementById('page-title').innerText = 'FXperto - ' + i18next.t('team.subtitle');
    }
} 