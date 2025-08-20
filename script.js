
// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing! Check your email for your discount code.');
});

// ---------- Add to Favorites & Add to Cart Functionality ---------- //

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavCount();
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateFavCount() {
    const favorites = getFavorites();
    document.querySelectorAll('.fav-count').forEach(el => {
        el.textContent = favorites.length;
    });
}

function updateCartCount() {
    const cart = getCart();
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalQuantity;
    });
}

function addToFavorites(productId, productName, productPrice, productImg) {
    let favorites = getFavorites();
    if (favorites.some(p => p.id === productId)) {
        alert(productName + ' is already in your favorites!');
        return;
    }
    favorites.push({
        id: productId,
        name: productName,
        price: productPrice,
        img: productImg
    });
    saveFavorites(favorites);
    alert(productName + ' added to favorites!');
}

function addToCart(productId, productName, productPrice, productImg) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice.replace('$', '')),
            img: productImg,
            quantity: 1
        });
    }
    saveCart(cart);
    alert(productName + ' added to cart!');
}

function setupFavCartButtons() {
    document.querySelectorAll('.add-fav-btn').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            const productId = card.getAttribute('data-product-id');
            const productName = card.querySelector('.product-name').textContent;
            const productPrice = card.querySelector('.product-price').textContent;
            const productImg = card.querySelector('img').src;
            addToFavorites(productId, productName, productPrice, productImg);
        });
    });

    document.querySelectorAll('.add-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            const productId = card.getAttribute('data-product-id');
            const productName = card.querySelector('.product-name').textContent;
            const productPrice = card.querySelector('.product-price').textContent;
            const productImg = card.querySelector('img').src;
            addToCart(productId, productName, productPrice, productImg);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateFavCount();
    updateCartCount();
    setupFavCartButtons();
});
