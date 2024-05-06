const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  if (book instanceof Book) {
    myLibrary.push(book);
  }
}

book1 = new Book('alpha', '0', 200, true);
book2 = new Book('beta', '1', 300, false);
book3 = new Book('gamma', '2', 400, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);


function createBookDetails(book) {
  const bookDetails = document.createElement('div');
  bookDetails.className = 'book-details';
  
  const unorderedList = document.createElement('ul');
  
  const title = document.createElement('li');
  const author = document.createElement('li');
  const pages = document.createElement('li');
  const read = document.createElement('li');
  
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = true;

  unorderedList.appendChild(title);
  unorderedList.appendChild(author);
  unorderedList.appendChild(pages);
  unorderedList.appendChild(read);

  bookDetails.appendChild(unorderedList)

  return bookDetails;
}

function createBookCard(book) {
  const tempBook = document.createElement('div');
  tempBook.className = 'book-card';

  const bookDetails = createBookDetails(book);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container'

  const removeBookButton = document.createElement('button');
  removeBookButton.textContent = "remove book"
  const changeReadStatusButton = document.createElement('button');
  changeReadStatusButton.textContent = "change read status"

  buttonsContainer.appendChild(removeBookButton);
  buttonsContainer.appendChild(changeReadStatusButton);

  tempBook.appendChild(bookDetails);
  tempBook.appendChild(buttonsContainer);

  return tempBook;
}


function loopThroughLibrary() {
  const bookContainer = document.getElementById('book-container');

  for (const book of myLibrary) {
    bookContainer.appendChild(createBookCard(book));

    // console.log(book.author);
  }
}

loopThroughLibrary();

const newBookButton = document.createElement('button');
newBookButton.textContent = 'NEW BOOK';

const newBookDialog = document.getElementById('new-book-dialog')

newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
})

document.body.appendChild(newBookButton);