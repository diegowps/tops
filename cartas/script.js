const cards = [
    { name: 'mico', img: 'https://example.com/mico.jpg' },
    { name: 'mico', img: 'https://example.com/mico.jpg' },
    { name: 'cachorrinho', img: 'https://example.com/cachorrinho.jpg' },
    { name: 'cachorrinho', img: 'https://example.com/cachorrinho.jpg' },
    { name: 'gato', img: 'https://example.com/gato.jpg' },
    { name: 'gato', img: 'https://example.com/gato.jpg' },
    { name: 'pato', img: 'https://example.com/pato.jpg' },
    { name: 'pato', img: 'https://example.com/pato.jpg' },
    { name: 'elefante', img: 'https://example.com/elefante.jpg' },
    { name: 'elefante', img: 'https://example.com/elefante.jpg' },
  ];
  
  let selectedCards = [];
  let matchedCards = [];
  
  // Função para criar o tabuleiro
  function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Limpar o tabuleiro
  
    // Embaralhar as cartas
    const shuffledCards = cards.sort(() => 0.5 - Math.random());
  
    // Criar as cartas
    shuffledCards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.name = card.name;
      
      // Adicionar a imagem
      const img = document.createElement('img');
      img.src = card.img; // URL da imagem
      img.alt = card.name; // Texto alternativo para acessibilidade
      img.style.display = 'none'; // Ocultar a imagem inicialmente
  
      cardElement.appendChild(img);
      cardElement.addEventListener('click', flipCard);
      board.appendChild(cardElement);
    });
  }
  
  // Função para virar a carta
  function flipCard() {
    if (selectedCards.length < 2 && !this.classList.contains('flip')) {
      this.classList.add('flip');
      this.firstChild.style.display = 'block'; // Mostrar a imagem
      selectedCards.push(this);
  
      if (selectedCards.length === 2) {
        checkMatch();
      }
    }
  }
  
  // Função para verificar se as cartas combinam
  function checkMatch() {
    const [card1, card2] = selectedCards;
  
    if (card1.dataset.name === card2.dataset.name) {
      matchedCards.push(card1, card2);
      selectedCards = [];
  
      if (matchedCards.length === cards.length) {
        setTimeout(() => alert('Você venceu!'), 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
        card1.firstChild.style.display = 'none'; // Ocultar a imagem
        card2.firstChild.style.display = 'none'; // Ocultar a imagem
        selectedCards = [];
      }, 1000);
    }
  }
  
  // Função para reiniciar o jogo
  document.getElementById('reset').addEventListener('click', createBoard);
  
  // Inicializar o tabuleiro ao carregar a página
  createBoard();
  