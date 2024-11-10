// Filtrando os produtos com base na barra de pesquisa
function filterProducts() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Alternando entre o tema claro e escuro
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark');
    
    const currentTheme = body.classList.contains('dark') ? '☀' : '☽';
    document.getElementById('theme-toggle').textContent = currentTheme;
}

// Recupera o carrinho armazenado no localStorage (ou um array vazio, se não houver carrinho salvo)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Função para adicionar produtos ao carrinho
function addToCart(productName, price) {
    cart.push({ productName, price });
    updateCart();
    saveCartToLocalStorage();
}

// Função para atualizar a visualização do carrinho
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;

    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = ''; // Limpar lista antes de adicionar os itens novamente
    let total = 0;

    // Preencher os itens do carrinho na lista
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.productName} - R$ ${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
        total += item.price;
    });

    // Exibir o total no carrinho
    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Função para salvar o carrinho no localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Abrir o carrinho de compras
document.getElementById('cart-btn').addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'flex';
    updateCart();  // Atualiza o carrinho sempre que a modal for aberta
});

// Fechar o carrinho de compras
document.getElementById('close-cart-btn').addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
});

// Finalizar compra (Apenas para simulação)
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Compra finalizada! Obrigado por comprar na Manga Verse!');
    cart = [];  // Limpar o carrinho após finalizar a compra
    saveCartToLocalStorage();  // Atualiza o localStorage após a compra
    updateCart();  // Atualiza a visualização do carrinho
});

// Iniciar a atualização do carrinho ao carregar a página
updateCart();


// Carrossel de Promoções
let currentSlide = 0;

function moveSlide(direction) {
    const carouselContainer = document.querySelector('.carousel-container');
    const totalSlides = document.querySelectorAll('.carousel-item').length;
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function autoSlide() {
    moveSlide(1);
}

setInterval(autoSlide, 10000);  // Passa os slides a cada 5 segundos
