const url = 'https://striveschool-api.herokuapp.com/books';

//Recupero il valore dell'input nel campo di ricerca

const searchInput = document.querySelector('.form-control');

//Array per memorizzare gli elementi nel carrello

const cart = [];

//invio una richiesta tramite fetch

fetch(url)
  .then(response => response.json())
  
  .then(booksList => {
    const booksContainer = document.getElementById('books-container');
    const cartContainer = document.getElementById('carrello');

    //Creo la card utilizzando le classi di bootstrap
    function createBookCard(book,) {

      const card = document.createElement('div');
      card.classList.add('card', 'mb-3', 'h-100',);
  
      const img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = book.img;
          
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'd-flex', 'align-items-center', 'flex-column');
  
      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = book.title;
  
      // const category = document.createElement('p');
      // category.classList.add('card-text');
      // category.textContent = `Categoria: ${book.category}`;
  
      const price = document.createElement('p');
      price.classList.add('card-text');
      price.textContent = `Prezzo: ${book.price}€`;
  
      // Creo il pulsante "Aggiungi al carrello"
      const addToCartButton = document.createElement('button');
      addToCartButton.classList.add('btn', 'btn-warning', 'my-1');
      addToCartButton.textContent = 'Aggiungi al carrello';

      //Aggiungo un evento di tipo click per "aggiungere al carrello"
      addToCartButton.addEventListener('click', () => {
        addToCart(book, card)
      })
      
      // Creo il pulsante "Salta prodotto"
      const skipProductButton = document.createElement('button');
      skipProductButton.classList.add('btn', 'btn-secondary', 'my-1');
      skipProductButton.textContent = 'Salta prodotto';
      skipProductButton.addEventListener('click', () => {
        // Stampo in console il libro saltato
        console.log(`Saltato prodotto: ${book.title}`);
        card.classList.add('d-none')
        });

      // Creo il pulsante "Dettagli"
      const detailsButton = document.createElement('button');
      detailsButton.classList.add('btn', 'btn-outline-warning', 'my-1');
      detailsButton.textContent = 'Dettagli';
      //Definisco l'url della pagina "dettagli"
      const detailsUrl = `/dettagli.html?id=${book.asin}`;

      //Aggiungo un listener al pulsante per un evento di tipo click
      detailsButton.addEventListener('click', () => {
        window.location.href = detailsUrl;
      });


  
      //aggiungo le info nel body della card
      cardBody.appendChild(title);
      //cardBody.appendChild(category);
      cardBody.appendChild(price);
  
      // Aggiungo i pulsanti al cardbody
      cardBody.appendChild(addToCartButton);
      cardBody.appendChild(skipProductButton);
      cardBody.appendChild(detailsButton);
  
      //aggiungo l'immagine alla card
      card.appendChild(img);
      //aggiungo il body alla card
      card.appendChild(cardBody);
  
      //infine ritorno la card completa
      return card;
  };

    //Creo una funzione per aggiungere l'elemento nel carrello
    function addToCart(book, card) {
    card.classList.add('added');
    // Stampo in console il libro aggiunto al carrello
    console.log(`Aggiunto al carrello: ${book.title},${book.price}€`);
    // Riempio l'array del carrello utilizzando il metodo .push
    cart.push(book);
    //Ritorno una funzione per renderizzare gli elementi nel carrello
    renderCart();
  }

    //Copio l'array originale della lista dei libri
    //let libriFiltrati = [...booksList];

    //Funzione per visualizzare i libri nella pagina
    function renderBooks(books) {
      //Svuoto il container dei libri
      booksContainer.innerHTML = '';
      //per ogni libro trovato passo la funzione per creare la card utilizzando il metodo forEach
      books.forEach(book => {
        const col = document.createElement('div');
        col.classList.add('col-6', 'col-md-3');
        const bookCard = createBookCard(book);
        //Aggiungo gli elementi nel container principale
        col.appendChild(bookCard)
        booksContainer.appendChild(col);
      });
    }
    
    //Funzione per visualizzare gli elementi nel carrello
    function renderCart() {
      //Svuoto il carrello
      cartContainer.innerHTML = '';
      //Se il carrello è vuoto inserisco un messaggio altrimenti creo una lista di elementi utilizzando le classi di bootstrap
      if (cart.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Nessun libro nel carrello.';
        cartContainer.appendChild(emptyCartMessage);
      } else {
        const cartList = document.createElement('ul');
        cartList.classList.add('list-group');

        cart.forEach(book => {
          const cartItem = document.createElement('li');
          cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

          const cartItemContent = document.createElement('span')
          cartItemContent.textContent = `${book.title} - Prezzo: ${book.price} €`;
          //Pulsante per rimuovere dal carrello un singolo elemento
          const removeButton = document.createElement('button');
          removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
          removeButton.textContent = 'Rimuovi';
          //Aggiungo un evento di tipo click al pulsante
          removeButton.addEventListener('click', () => removeFromCart(book));
          //Aggiungo la lista nel DOM
          cartItem.appendChild(cartItemContent)
          cartItem.appendChild(removeButton);
          cartList.appendChild(cartItem);
        });
    
        // Creazione dinamica del pulsante "Svuota carrello"
        const clearCartButton = document.createElement('button');
        clearCartButton.classList.add('btn', 'btn-danger', 'mt-3');
        clearCartButton.textContent = 'Svuota carrello';
        clearCartButton.addEventListener('click', () => {
          cart.length = [];
          //Richiamo la funzione per aggiornare la visualizzazione
          renderCart();
        });

        //Conto gli elementi nell'array del carrello
        const cartCountElement = document.createElement('p');
        cartCountElement.textContent = `Nel carrello ci sono ${cart.length} libri:`;

        //Aggiungo gli elementi nel container del carrello
        cartContainer.appendChild(cartCountElement);
        cartContainer.appendChild(cartList);
        cartContainer.appendChild(clearCartButton);
      }
    }

    //Funzione per rimuovere gli elementi nel carrello
    function removeFromCart(book) {
      //Cerco l'indice del libro da rimuovere dal carrello
      const bookIndex = cart.indexOf(book);
      //Se l'indice trovato è diverso da -1 l'elemento può essere rimosso
      if (bookIndex !== -1) {
        //Rimuovo l'elemento utilizzando il metodo .splice
        cart.splice(bookIndex, 1);
        //Richiamo la funzione per aggiornare la visualizzazione
        renderCart();
      }
    }

    //Aggiungo un evento 'input' al campo di ricerca
    searchInput.addEventListener('input', () => {
      //Rimuovo gli spazi all'inizio e alla fine del testo e trasformo tutto in minuscolo
      const searchText = searchInput.value.trim().toLowerCase();
      //Se il testo inserito è uguale o maggiore di tre caratteri, mostro i libri cercati
      if (searchText.length >= 3) {
        //Utilizzo il metodo filter per filtrare l'array dei libri
        const libriFiltrati = booksList.filter(book =>
          //Faccio in modo che il titolo includa i caratteri inseriti
          book.title.toLowerCase().includes(searchText)
          );
          //Richiamo la funzione renderBooks per aggiornare la visualizzazione nel DOM
          renderBooks(libriFiltrati);
      }
      //Altrimenti mostro la lista completa dei libri 
      else {
        renderBooks(booksList);
      }
    });

    //Richiamo le funzioni per aggiornare la visualizzazione
    renderBooks(booksList);
    renderCart();   
  })
  .catch(error => {
    console.error('Si è verificato un errore durante la richiesta:', error);
  });

/////////////////////////////////
//CODICE PER LA PAGINA DETTAGLI//
/////////////////////////////////

//Creo un nuovo oggetto rappresentante i parametri contenuti nell'URL
const params = new URLSearchParams(location.search);
//Estraggo il valore dell'ID utilizzando il metodo .get
const asin = params.get("id");

const detailsContainer = document.getElementById('book-details');
//Creo l'URL completo con il parametro asin dinamico
const apiUrl = `https://striveschool-api.herokuapp.com/books/${asin}`;

//Creo una fetch per ottenere i dettagli del libro e creare una lista
fetch(apiUrl)
  .then(response => response.json())
  .then(bookDetails => {

    //Costruisco una lista con i dettagli del libro
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-details');

    const title = document.createElement('h2');
    title.textContent = bookDetails.title;

    const detailsList = document.createElement('ul');
    detailsList.classList.add('list-group');

    const categoryItem = document.createElement('li');
    categoryItem.classList.add('list-group-item', 'list-group-item-warning');
    categoryItem.textContent = `Categoria: ${bookDetails.category}`;

    const priceItem = document.createElement('li');
    priceItem.classList.add('list-group-item', 'list-group-item-warning');
    priceItem.textContent = `Prezzo: ${bookDetails.price} €`;

    detailsList.appendChild(categoryItem);
    detailsList.appendChild(priceItem);

    bookInfo.appendChild(title);
    bookInfo.appendChild(detailsList);

    document.getElementById('book-detail').appendChild(bookInfo);

  })
  .catch(error => {
    console.error('Si è verificato un errore durante la richiesta: ', error);
  });