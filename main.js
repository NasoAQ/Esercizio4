const url = 'https://striveschool-api.herokuapp.com/books';

//Array per memorizzare gli elementi nel carrello

const cartItems = [];

//invio una richiesta tramite fetch

fetch(url)
  .then(response => response.json())
  
  .then(booksList => {
    const booksContainer = document.getElementById('books-container');

    //per ogni libro trovato creo un elemento html sfruttando le classi bootstrap per l'impaginazione utilizzando il metodo forEach

    booksList.forEach(book => {
        const col = document.createElement('div');
        col.classList.add('col-6', 'col-md-3');
        
        const bookCard = createBookCard(book, cartItems);
        col.appendChild(bookCard)
        booksContainer.appendChild(col);
    });
  })
  .catch(error => {
    console.error('Si è verificato un errore durante la richiesta:', error);
  });

//creo la card dinamicamente aggiungendo le classi di bootstrap

function createBookCard(book, cart) {

    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = book.img;
        

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'align-items-center', 'flex-column');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = book.title;

    const category = document.createElement('p');
    category.classList.add('card-text');
    category.textContent = `Categoria: ${book.category}`;

    const price = document.createElement('p');
    price.classList.add('card-text');
    price.textContent = `Prezzo: ${book.price}€`;

    // Creo il pulsante "Aggiungi al carrello"
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('btn', 'btn-warning', 'my-1');
    addToCartButton.textContent = 'Aggiungi al carrello';
    addToCartButton.addEventListener('click', () => {
      card.classList.add('added');
      // Stampo in console il libro aggiunto al carrello
      console.log(`Aggiunto al carrello: ${book.title},${book.price}€`);
      cart.push(book);

      const cartContainer = document.getElementById('carrello');
      const cartItem = document.createElement('div')
      cartItem.classList.add('col', 'col-12', 'mb-2');
      cartItem.textContent = `${book.title} - Prezzo: ${book.price}€`;

      cartContainer.appendChild(cartItem);
      console.log(`Aggiunto al carrello: ${book.title}`);
    });
    

     // Creare il pulsante "Salta prodotto"
    const skipProductButton = document.createElement('button');
    skipProductButton.classList.add('btn', 'btn-secondary', 'my-1');
    skipProductButton.textContent = 'Salta prodotto';
    skipProductButton.addEventListener('click', () => {
      // Stampo in console il libro saltato
      console.log(`Saltato prodotto: ${book.title}`);
      });

    //aggiungo le info nel body della card
    cardBody.appendChild(title);
    cardBody.appendChild(category);
    cardBody.appendChild(price);

// Aggiungo i pulsanti al cardbody
    cardBody.appendChild(addToCartButton);
    cardBody.appendChild(skipProductButton);

//aggiungo l'immagine alla card
    card.appendChild(img);
//aggiungo il body alla card
    card.appendChild(cardBody);

    //infine ritorno la card completa
    return card;
};
  