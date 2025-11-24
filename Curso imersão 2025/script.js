let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = []; 


async function iniciarBusca() {
   if(dados.length === 0) { 
      try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();     
    } catch (error) {
        console.error("Falha ao buscar dados:", error);
        return;
    }
}



    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter( dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    
    
    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        const imagemTag = dado.img ? `<img src="${dado.img}" alt="Capa do livro ${dado.nome}">` : '';
        article.innerHTML = ` 
            ${imagemTag}
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <div class="card-texto-ano">
            <h3>Preço:</h3>
            <p>R$${dado.preco}</p>
            </div>
            <button>Comprar</button>
            `
        cardContainer.appendChild(article);
    }
}


 //Animação 

const cards = document.querySelectorAll(".card-incentiva");

function showCardsOnScroll() {
    const trigger = window.innerHeight * 0.85; 

    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;

        if (top < trigger) {
            card.classList.add("show");
        }
    });
}

window.addEventListener("scroll", showCardsOnScroll);
window.addEventListener("load", showCardsOnScroll);


const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const darkModeIcon = darkModeToggle.querySelector('img');

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

  
  
});
