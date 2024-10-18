const cards = [
    { name: 'mico', img: 'https://odia.ig.com.br/_midias/jpg/2024/03/01/mico-32161635.jpg' },
    { name: 'mico', img: 'https://odia.ig.com.br/_midias/jpg/2024/03/01/mico-32161635.jpg' },
    { name: 'cachorro', img: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_1450943.jpg' },
    { name: 'cachorro', img: 'https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/nationalgeographic_1450943.jpg' },
    { name: 'gato', img: 'https://cdn.pixabay.com/photo/2024/04/12/23/54/animal-8692802_1280.jpg' },
    { name: 'gato', img: 'https://cdn.pixabay.com/photo/2024/04/12/23/54/animal-8692802_1280.jpg' },
    { name: 'pato', img: 'https://blog-leiturinha-novo.s3.us-east-1.amazonaws.com/production/uploads/2022/06/iStock-1314796448-1.jpg' },
    { name: 'pato', img: 'https://blog-leiturinha-novo.s3.us-east-1.amazonaws.com/production/uploads/2022/06/iStock-1314796448-1.jpg' },
    { name: 'elefante', img: 'https://www.petz.com.br/blog/wp-content/uploads/2022/03/animal-mais-forte-do-mundo.jpg' },
    { name: 'elefante', img: 'https://www.petz.com.br/blog/wp-content/uploads/2022/03/animal-mais-forte-do-mundo.jpg' },
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
  