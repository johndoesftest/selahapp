document.addEventListener('DOMContentLoaded', () => {
    // Basic navigation logic
    window.switchScreen = function(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById('screen-' + screenId).classList.add('active');
        
        // Update bottom nav
        const bottomNav = document.querySelector('.bottom-nav');
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            
            let tabName = item.textContent.trim().toLowerCase();
            if (tabName === 'profile') tabName = 'paywall';

            if(tabName === screenId) {
                item.classList.add('active');
            }
        });

        if (screenId === 'chat' || screenId === 'verse' || screenId === 'paywall') {
            bottomNav.style.display = 'none';
        } else {
            bottomNav.style.display = 'flex';
        }
    };

    // Paywall plan toggling
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active classes from all
            planCards.forEach(c => {
                c.classList.remove('active-plan');
                const radio = c.querySelector('.radio-btn');
                if (radio) {
                    radio.classList.remove('active-radio');
                    radio.innerHTML = '';
                }
            });
            // Add to clicked
            card.classList.add('active-plan');
            const radio = card.querySelector('.radio-btn');
            if (radio) {
                radio.classList.add('active-radio');
                radio.innerHTML = '<div class="radio-inner"></div>';
            }
        });
    });

    // Primary CTA
    const ctaPrimary = document.querySelector('.cta-primary');
    if(ctaPrimary) {
        ctaPrimary.addEventListener('click', () => {
            alert('Proceeding to subscription flow...');
        });
    }

    // Toggle switch interaction
    const toggleSwitch = document.querySelector('.toggle-switch');
    if (toggleSwitch) {
        toggleSwitch.addEventListener('click', () => {
            toggleSwitch.classList.toggle('active');
            
            const isTrial = toggleSwitch.classList.contains('active');
            
            // Update the first plan card text
            if (planCards[0]) {
                const title = planCards[0].querySelector('h3');
                const subtitle = planCards[0].querySelector('p');
                if (title && subtitle) {
                    if (isTrial) {
                        title.textContent = '7 days free';
                        subtitle.textContent = 'Then $59.99/year';
                    } else {
                        title.textContent = '$59.99 / year';
                        subtitle.textContent = 'Cancel anytime';
                    }
                }
            }
            
            // Update CTA text
            if (ctaPrimary) {
                if (isTrial) {
                    ctaPrimary.innerHTML = 'Try for Free <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>';
                } else {
                    ctaPrimary.innerHTML = 'Subscribe <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>';
                }
            }
        });
    }

    // Chat screen interactions
    const suggestionCards = document.querySelectorAll('.suggestion-card');
    const chatInput = document.querySelector('.chat-composer input');
    
    if (suggestionCards && chatInput) {
        suggestionCards.forEach(card => {
            card.addEventListener('click', () => {
                // Get text without the chevron icon
                const text = card.textContent.trim();
                chatInput.value = text;
                chatInput.focus();
            });
        });
    }

    const chatActions = document.querySelectorAll('.selah-message-actions i');
    chatActions.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.style.transition = 'all 0.2s ease';
        
        icon.addEventListener('click', () => {
            if (icon.classList.contains('fa-thumbs-up')) {
                icon.classList.toggle('fa-solid');
                icon.classList.toggle('fa-regular');
                icon.style.color = icon.classList.contains('fa-solid') ? 'var(--accent-color)' : '';
                const td = icon.parentElement.querySelector('.fa-thumbs-down');
                if (td) { td.classList.remove('fa-solid'); td.classList.add('fa-regular'); td.style.color = ''; }
            } else if (icon.classList.contains('fa-thumbs-down')) {
                icon.classList.toggle('fa-solid');
                icon.classList.toggle('fa-regular');
                icon.style.color = icon.classList.contains('fa-solid') ? 'var(--accent-color)' : '';
                const tu = icon.parentElement.querySelector('.fa-thumbs-up');
                if (tu) { tu.classList.remove('fa-solid'); tu.classList.add('fa-regular'); tu.style.color = ''; }
            } else if (icon.classList.contains('fa-copy')) {
                alert('Message copied to clipboard!');
            } else {
                // Click animation for other icons
                icon.style.transform = 'scale(0.8)';
                setTimeout(() => icon.style.transform = 'scale(1)', 150);
            }
        });
    });

    // Chat header actions
    const textSizeBtn = document.querySelector('.text-size-btn');
    const chatArea = document.querySelector('.chat-area');
    
    if (textSizeBtn && chatArea) {
        textSizeBtn.addEventListener('click', () => {
            chatArea.classList.toggle('large-text');
            textSizeBtn.style.color = chatArea.classList.contains('large-text') ? 'var(--accent-color)' : '';
        });
    }

    const headerActionBtns = document.querySelectorAll('.header-action-btn');
    headerActionBtns.forEach(btn => {
        btn.style.transition = 'all 0.2s ease';
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from immediately closing it
            
            // Close any open menus first
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu.id !== btn.id.replace('-btn', '-menu')) {
                    menu.classList.remove('show');
                }
            });
            
            btn.style.transform = 'scale(0.8)';
            setTimeout(() => btn.style.transform = 'scale(1)', 150);
            
            if (btn.id === 'settings-btn') {
                const menu = document.getElementById('settings-menu');
                if(menu) menu.classList.toggle('show');
            } else if (btn.id === 'more-btn') {
                const menu = document.getElementById('more-menu');
                if(menu) menu.classList.toggle('show');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    });

    // Add alerts for dropdown items just to show interactivity
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = item.textContent.trim();
            setTimeout(() => alert('Selected: ' + action), 200);
            item.parentElement.classList.remove('show');
        });
    });
});
