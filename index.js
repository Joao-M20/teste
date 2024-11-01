// Elementos HTML
const text = document.getElementById("text");
const button = document.getElementById("button");

// Função chamada ao clicar no botão para criar um novo card
button.onclick = async function() {
    const valor = text.value;

    try {
        const response = await fetch('http://localhost:8080/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: valor })
        });

        if (response.ok) {
            const newCard = await response.json();
            console.log('Card criado com sucesso:', newCard);

            renderCard(newCard); // Exibe o novo card imediatamente na tela
            text.value = ''; // Limpa o campo de entrada
        } else {
            console.log('Erro ao enviar card');
        }
    } catch (error) {
        console.log('Erro na requisição:', error);
    }
};

// Função para buscar e renderizar todos os cards ao carregar a página
async function fetchCards() {
    try {
        const response = await fetch('http://localhost:8080/cards', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const cards = await response.json();
            renderCards(cards); // Renderiza a lista de cards
        } else {
            console.log("Erro ao buscar os cards");
        }
    } catch (error) {
        console.log('Erro na requisição:', error);
    }
}

// Função para renderizar uma lista de cards (usada no carregamento inicial)
function renderCards(cards) {
    const cardContainer = document.getElementById('caixao');
    cardContainer.innerHTML = ''; // Limpa o container antes de renderizar todos os cards

    cards.forEach(card => {
        renderCard(card); // Renderiza cada card individualmente
    });
}

// Função para renderizar um único card (usada ao adicionar um novo card)
function renderCard(card) {
    const cardContainer = document.getElementById('caixao');

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerText = card.text;

    cardContainer.appendChild(cardElement);
}

// Carrega todos os cards ao iniciar a página
document.addEventListener('DOMContentLoaded', fetchCards);
