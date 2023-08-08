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

    function createBookCard(book,) {

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
        addToCart(book, card)
      })
      
      // Creare il pulsante "Salta prodotto"
      const skipProductButton = document.createElement('button');
      skipProductButton.classList.add('btn', 'btn-secondary', 'my-1');
      skipProductButton.textContent = 'Salta prodotto';
      skipProductButton.addEventListener('click', () => {
        // Stampo in console il libro saltato
        console.log(`Saltato prodotto: ${book.title}`);
        card.classList.add('d-none')
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

  function addToCart(book, card) {
    card.classList.add('added');
    // Stampo in console il libro aggiunto al carrello
    console.log(`Aggiunto al carrello: ${book.title},${book.price}€`);
    cart.push(book);

    //const cartContainer = document.getElementById('carrello');
    //const cartItem = document.createElement('div');
    //cartItem.classList.add('col', 'col-12', 'mb-2');
    //cartItem.textContent = `${book.title} - Prezzo: ${book.price}€`;

    //cartContainer.appendChild(cartItem);
    //console.log(`Aggiunto al carrello: ${book.title}`);
    renderCart();
  }

    //Copio l'array originale della lista dei libri
    //let libriFiltrati = [...booksList];

    function renderBooks(books) {
      //Svuoto il container dei libri

      booksContainer.innerHTML = '';

      //per ogni libro trovato creo un elemento html sfruttando le classi bootstrap per l'impaginazione utilizzando il metodo forEach

      books.forEach(book => {
        const col = document.createElement('div');
        col.classList.add('col-6', 'col-md-3');
      
        const bookCard = createBookCard(book);

      col.appendChild(bookCard)
      booksContainer.appendChild(col);
      });
    }
    
    function renderCart() {
      cartContainer.innerHTML = '';
    
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
    
          const removeButton = document.createElement('button');
          removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
          removeButton.textContent = 'Rimuovi';
          removeButton.addEventListener('click', () => removeFromCart(book));
          
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
          renderCart();
        });
        
        cartContainer.appendChild(cartList);
        cartContainer.appendChild(clearCartButton);
      }
    }

    function removeFromCart(book) {
      const bookIndex = cart.indexOf(book);
      if (bookIndex !== -1) {
        cart.splice(bookIndex, 1);
        renderCart();
      }
    }

    //Aggiungo un evento 'input' al campo di ricerca

    searchInput.addEventListener('input', () => {
      const searchText = searchInput.value.trim().toLowerCase();
      //Creo una condizione in base alla lunghezza del testo digitato
      if (searchText.length >= 3) {

        const libriFiltrati = booksList.filter(book =>
          book.title.toLowerCase().includes(searchText)
          );
          renderBooks(libriFiltrati);
      } else {
        //Se il testo inserito è troppo corto, mostro la lista completa dei libri
       //libriFiltrati = [...booksList];
        renderBooks(booksList);
      }
    });

    renderBooks(booksList);
    renderCart();   
  })
  .catch(error => {
    console.error('Si è verificato un errore durante la richiesta:', error);
  });






  