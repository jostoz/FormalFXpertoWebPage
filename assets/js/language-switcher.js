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
    
    // Update page title based on current page
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    
    // Update document title based on the page
    if (filename === 'team.html') {
        document.title = i18next.t('siteTitle.team');
    } else if (filename === 'index.html' || filename === '' || path.endsWith('/')) {
        document.title = i18next.t('siteTitle.home');
    } else if (filename === 'about-1.html') {
        document.title = i18next.t('siteTitle.about');
    } else if (filename === 'service.html') {
        document.title = i18next.t('siteTitle.services');
    } else if (filename === 'contact.html') {
        document.title = i18next.t('siteTitle.contact');
    } else {
        document.title = i18next.t('siteTitle.default');
    }
} 