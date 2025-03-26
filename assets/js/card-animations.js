/**
 * Financial AI Cards Animations
 * Using GSAP and Tilt.js for advanced animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Tilt.js on all financial cards
    const tiltOptions = {
        max: 10,                // max tilt rotation (degrees)
        perspective: 1500,      // transform perspective, the lower the more extreme the tilt gets
        scale: 1.03,            // 2 = 200%, 1.5 = 150%, etc.
        speed: 800,             // speed of the enter/exit transition
        transition: true,       // set a transition on enter/exit
        axis: null,             // what axis should be disabled. Can be X or Y
        reset: true,            // if the tilt effect has to be reset on exit
        easing: "cubic-bezier(.03,.98,.52,.99)", // easing on enter/exit
        glare: true,            // if it should have a "glare" effect
        "max-glare": 0.2,       // the maximum "glare" opacity
        "glare-prerender": false, // false = VanillaTilt creates the glare elements for you, otherwise you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
        "mouse-event-element": null, // css-selector or link to HTML-element what will be listen mouse events
        gyroscope: true,        // Boolean to enable/disable device orientation detection
        gyroscopeMinAngleX: -45, // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element
        gyroscopeMaxAngleX: 45, // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element
        gyroscopeMinAngleY: -45, // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element
        gyroscopeMaxAngleY: 45, // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element
    };

    // Apply tilt effect to all financial cards
    const cards = document.querySelectorAll('.financial-card');
    cards.forEach(card => {
        VanillaTilt.init(card, tiltOptions);
        
        // Set up GSAP animations for each card
        setupCardAnimations(card);
    });

    // Set up GSAP animations for card elements
    function setupCardAnimations(card) {
        // Create a timeline for each card that will be triggered on hover
        const tl = gsap.timeline({ paused: true });
        
        // Add animations to the timeline
        
        // Badge animation
        const badge = card.querySelector('.badge-tag');
        if (badge) {
            tl.to(badge, { 
                y: -5, 
                scale: 1.05, 
                boxShadow: '0 8px 20px rgba(12, 90, 219, 0.3)',
                duration: 0.4,
                ease: "power2.out"
            }, 0);
        }
        
        // Heading animation
        const heading = card.querySelector('h3');
        if (heading) {
            tl.to(heading, { 
                y: -5, 
                color: card.classList.contains('blue-card') ? '#ffffff' : '#43baff',
                textShadow: '0 0 10px rgba(12, 90, 219, 0.5)',
                duration: 0.4,
                ease: "power2.out"
            }, 0);
        }
        
        // Highlight text animation (like $30,000)
        const highlight = card.querySelector('.highlight-text');
        if (highlight) {
            tl.to(highlight, { 
                scale: 1.1, 
                textShadow: '0 0 15px rgba(12, 90, 219, 0.7)',
                duration: 0.4,
                ease: "power2.out"
            }, 0.1);
            
            // Add counter animation for numbers
            if (!isNaN(parseFloat(highlight.textContent.replace(/[^0-9.]/g, '')))) {
                const value = parseFloat(highlight.textContent.replace(/[^0-9.]/g, ''));
                const prefix = highlight.textContent.split(value)[0];
                const suffix = highlight.textContent.split(value)[1] || '';
                
                // Store original text
                highlight.setAttribute('data-value', value);
                highlight.setAttribute('data-prefix', prefix);
                highlight.setAttribute('data-suffix', suffix);
                
                // Add counter animation
                tl.to(highlight, {
                    duration: 0.8,
                    ease: "power2.out",
                    onStart: function() {
                        // Start counting animation
                        const startValue = value * 0.7; // Start from 70% of the value
                        const endValue = value;
                        const counterTl = gsap.timeline();
                        
                        counterTl.to({ val: startValue }, {
                            val: endValue,
                            duration: 0.8,
                            ease: "power2.out",
                            onUpdate: function() {
                                const currentValue = this.targets()[0].val.toFixed(0);
                                highlight.textContent = prefix + currentValue + suffix;
                            }
                        });
                    }
                }, 0.1);
            }
        }
        
        // Trophy animation
        const trophy = card.querySelector('.trophy-container');
        if (trophy) {
            tl.to(trophy, { 
                y: -10, 
                rotation: 5, 
                scale: 1.1,
                duration: 0.5,
                ease: "power2.out"
            }, 0);
        }
        
        // Chart animation
        const chart = card.querySelector('.chart-container');
        if (chart) {
            tl.to(chart, { 
                scale: 1.05, 
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                duration: 0.4,
                ease: "power2.out"
            }, 0.2);
            
            // Enhance chart animation
            const animatedChart = chart.querySelector('.animated-chart');
            if (animatedChart) {
                // Change animation speed on hover
                tl.to(animatedChart, {
                    animationDuration: '2s',
                    background: 'linear-gradient(90deg, #0c5adb 0%, #43baff 50%, transparent 50%)',
                    boxShadow: '0 0 15px rgba(12, 90, 219, 0.5)',
                    duration: 0.3
                }, 0.2);
            }
        }
        
        // Portfolio items animation
        const portfolioItems = card.querySelectorAll('.portfolio-item');
        if (portfolioItems.length > 0) {
            portfolioItems.forEach((item, index) => {
                tl.to(item, { 
                    x: 5, 
                    duration: 0.3,
                    ease: "power2.out"
                }, 0.1 + (index * 0.05));
                
                const img = item.querySelector('img');
                if (img) {
                    tl.to(img, { 
                        rotation: 5, 
                        scale: 1.1,
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                        duration: 0.4,
                        ease: "power2.out"
                    }, 0.1 + (index * 0.05));
                }
                
                const percentage = item.querySelector('.percentage');
                if (percentage) {
                    tl.to(percentage, { 
                        color: '#43baff', 
                        scale: 1.1,
                        duration: 0.4,
                        ease: "power2.out"
                    }, 0.1 + (index * 0.05));
                }
            });
        }
        
        // Button animation
        const button = card.querySelector('.card-button a');
        if (button) {
            tl.to(button, { 
                x: 5, 
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                duration: 0.4,
                ease: "power2.out"
            }, 0.3);
        }
        
        // Set up hover events to play/reverse the timeline
        card.addEventListener('mouseenter', () => {
            tl.play();
        });
        
        card.addEventListener('mouseleave', () => {
            tl.reverse();
        });
    }

    // Add special effects for the first card with trophy
    const firstCard = document.querySelector('.financial-card:first-child');
    if (firstCard) {
        // Check if we need to add a trophy
        if (!firstCard.querySelector('.trophy-container') && firstCard.querySelector('.highlight-text')) {
            const highlightText = firstCard.querySelector('.highlight-text');
            
            // Create trophy container
            const trophyContainer = document.createElement('div');
            trophyContainer.className = 'trophy-container';
            
            // Create trophy image
            const trophyImg = document.createElement('img');
            trophyImg.className = 'trophy-img';
            trophyImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tISBGb250IEF3ZXNvbWUgUHJvIDYuNC4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlIChDb21tZXJjaWFsIExpY2Vuc2UpIENvcHlyaWdodCAyMDIzIEZvbnRpY29ucywgSW5jLiAtLT48cGF0aCBmaWxsPSIjZmZkNzAwIiBkPSJNMzIwIDM4LjljMC44Ni0uNjYgMS44My0xLjI5IDIuODctMS44NkMzMzAuNyAzMi43MiAzMzYuMiAzMiAzNDEuNyAzMkgzODRjMzUuMyAwIDY0IDI4LjcgNjQgNjRWMjI0YzAgMzUuMyAtMjguNyA2NCAtNjQgNjRIMzQxLjdjLTUuNSAwLTExLTAuNzItMTYuOC00LjA0Yy0xLjA0LS41Ny0yLjAxLTEuMi0yLjg3LTEuODZjLTEzLjQ3IDEwLjI4LTMwLjIxIDE2LjQtNDguMzYgMTYuNGMtMTguMTUgMC0zNC44OS02LjEyLTQ4LjM2LTE2LjRjLS44NiAuNjYtMS44MyAxLjI5LTIuODcgMS44NkMyMTcuMyAyODcuMyAyMTEuOCAyODggMjA2LjMgMjg4SDE2NGMtMzUuMyAwLTY0LTI4LjctNjQtNjRWOTZjMC0zNS4zIDI4LjctNjQgNjQtNjRoNDIuM2M1LjUgMCAxMS0wLjcyIDE2LjgtNC4wNGMxLjA0LS41NyAyLjAxLTEuMiAyLjg3LTEuODZDMjM5LjQgMTUuODIgMjU2LjEgOS43IDI3My43IDkuN2MxOC4xNSAwIDM0Ljg5IDYuMTIgNDguMzYgMTYuNHpNMTI4IDk2djEyOGMwIDE3LjcgMTQuMyAzMiAzMiAzMmg0Mi4zYzEuMSAwIDIuMi0wLjE0IDMuMy0wLjQzYy0xLjAxLTEuNjMtMS45OS0zLjMtMi45NC01LjAyYy03LjYyLTEzLjgtMTIuNi0yOS40Ni0xMi42LTQ2LjU1YzAtMTcuMDkgNC45OC0zMi43NSAxMi42LTQ2LjU1YzQuNDEtNy45OSA5Ljk0LTE1LjI5IDE2LjQ2LTIxLjYxYzYuNTEtNi4zMiAxMy45LTExLjQ4IDIxLjk0LTE1LjA1YzQuMTctMS44NSA4LjUzLTMuMzIgMTMuMDMtNC40M2MtMS4xLTAuMjktMi4yLTAuNDMtMy4zLTAuNDNIMTYwYy0xNy43IDAtMzIgMTQuMy0zMiAzMnptMjU2IDBjMC0xNy43LTE0LjMtMzItMzItMzJoLTQyLjNjLTEuMSAwLTIuMiAwLjE0LTMuMyAwLjQzYzEuMDEgMS42MyAxLjk5IDMuMyAyLjk0IDUuMDJjNy42MiAxMy44IDEyLjYgMjkuNDYgMTIuNiA0Ni41NWMwIDE3LjA5LTQuOTggMzIuNzUtMTIuNiA0Ni41NWMtNC40MSA3Ljk5LTkuOTQgMTUuMjktMTYuNDYgMjEuNjFjLTYuNTEgNi4zMi0xMy45IDExLjQ4LTIxLjk0IDE1LjA1Yy00LjE3IDEuODUtOC41MyAzLjMyLTEzLjAzIDQuNDNjMS4xIDAuMjkgMi4yIDAuNDMgMy4zIDAuNDNIMzUyYzE3LjcgMCAzMi0xNC4zIDMyLTMyVjk2ek0yNzMuNyA0MS43Yy0xNy40IDAtMzIuNSA5LjI4LTQwLjk1IDIzLjE3Yy04LjQ1IDEzLjg5LTEzLjU1IDMzLjA2LTEzLjU1IDU0LjI0YzAgMjEuMTggNS4xIDQwLjM1IDEzLjU1IDU0LjI0YzguNDUgMTMuODkgMjMuNTUgMjMuMTcgNDAuOTUgMjMuMTdjMTcuNCAwIDMyLjUtOS4yOCA0MC45NS0yMy4xN2M4LjQ1LTEzLjg5IDEzLjU1LTMzLjA2IDEzLjU1LTU0LjI0YzAtMjEuMTgtNS4xLTQwLjM1LTEzLjU1LTU0LjI0Yy04LjQ1LTEzLjg5LTIzLjU1LTIzLjE3LTQwLjk1LTIzLjE3ek0yMDggMzUydjE2YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4aDY0YzI2LjUgMCA0OC0yMS41IDQ4LTQ4VjM1MmgtMTYwek0xNzYgNDgwYzAtMjYuNSAyMS41LTQ4IDQ4LTQ4aDEyOGMyNi41IDAgNDggMjEuNSA0OCA0OHYzMkgxNzZWNDgweiIvPjwvc3ZnPg==';
            trophyImg.alt = 'Trophy';
            
            // Append trophy to container
            trophyContainer.appendChild(trophyImg);
            
            // Insert trophy before highlight text
            firstCard.insertBefore(trophyContainer, highlightText);
            
            // Add GSAP animation for the trophy
            gsap.to(trophyContainer, {
                y: -5,
                rotation: 5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    }
    
    // Add AI badge to the last card
    const aiCard = document.querySelector('.financial-card:nth-child(6)');
    if (aiCard && !aiCard.querySelector('.ai-badge')) {
        const heading = aiCard.querySelector('h3');
        if (heading) {
            // Create AI badge
            const aiBadge = document.createElement('div');
            aiBadge.className = 'ai-badge';
            aiBadge.innerHTML = '<i class="bi bi-robot"></i> AI';
            
            // Insert before heading
            aiCard.insertBefore(aiBadge, heading);
            
            // Add animation
            gsap.to(aiBadge, {
                scale: 1.1,
                boxShadow: '0 0 10px rgba(12, 90, 219, 0.5)',
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
    
    // Add price alert box to the third card
    const alertCard = document.querySelector('.financial-card:nth-child(3)');
    if (alertCard && !alertCard.querySelector('.price-alert-box')) {
        const chartContainer = alertCard.querySelector('.chart-container');
        if (chartContainer) {
            // Create price alert box
            const alertBox = document.createElement('div');
            alertBox.className = 'price-alert-box';
            alertBox.innerHTML = `
                <div class="alert-header">
                    <span>TSLA</span>
                    <span class="alert-time">15:02</span>
                </div>
                <div class="alert-value">Price crossed $220</div>
                <div class="alert-actions">
                    <span class="alert-button">DISMISS</span>
                    <span class="alert-button">EDIT ALERT</span>
                    <span class="alert-icon"><i class="bi bi-bell-fill"></i></span>
                </div>
            `;
            
            // Insert after chart container
            chartContainer.parentNode.insertBefore(alertBox, chartContainer.nextSibling);
            
            // Add animation
            gsap.fromTo(alertBox, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, delay: 0.5 }
            );
        }
    }
    
    // Add stock status to the AI card
    const perspectivesCard = document.querySelector('.financial-card:nth-child(6)');
    if (perspectivesCard && !perspectivesCard.querySelector('.stock-status')) {
        const highlightText = perspectivesCard.querySelector('.highlight-text');
        if (highlightText) {
            // Create stock status badge
            const stockStatus = document.createElement('div');
            stockStatus.className = 'stock-status';
            stockStatus.innerHTML = 'Tesla is now <strong>Bullish!</strong>';
            
            // Insert after highlight text
            highlightText.parentNode.insertBefore(stockStatus, highlightText.nextSibling);
            
            // Add animation
            gsap.to(stockStatus, {
                backgroundColor: 'rgba(12, 90, 219, 0.2)',
                boxShadow: '0 0 10px rgba(12, 90, 219, 0.3)',
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
});
