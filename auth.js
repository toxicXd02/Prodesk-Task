// Add this script to all pages that need authentication checking

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const userIcon = document.querySelector('.nav-icons a[href*="login"]');
    
    if (token) {
        // User is logged in - change user icon to account link
        if (userIcon) {
            userIcon.href = 'account.html';
            userIcon.title = 'My Account';
        }
    } else {
        // User is not logged in - ensure user icon points to login
        if (userIcon) {
            userIcon.href = 'login.html';
            userIcon.title = 'Login';
        }
    }
}

// Check auth status when page loads
document.addEventListener('DOMContentLoaded', checkAuthStatus);
