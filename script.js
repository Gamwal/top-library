let myLibrary = [];

let indexedLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function indexBooks() {
  indexedLibrary = [];
  myLibrary.forEach((item, index) => {
    item.index = index;
    indexedLibrary.push(item);
  });
}

function addBookToLibrary(book) {
  if (book instanceof Book) {
    if (book.title !== '' && book.author !== '' && book.pages !== ''){
      myLibrary.push(book);
    }
  }
  indexBooks();
}

book1 = new Book('The Prince', 'Niccolo Machiavelli', 231, "no");
book2 = new Book('The Alchemist', 'Paulo Coelho', 195, "yes");

addBookToLibrary(book1);
addBookToLibrary(book2);


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
  read.textContent = (book.read === "yes") ? "Read" : "Not read";

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
  removeBookButton.className = "remove-book";
  removeBookButton.textContent = "remove book";
  removeBookButton.value = book.index;

  const changeReadStatusButton = document.createElement('button');
  changeReadStatusButton.className = "change-status";
  changeReadStatusButton.textContent = "change read status";
  changeReadStatusButton.value = book.index;

  buttonsContainer.appendChild(removeBookButton);
  buttonsContainer.appendChild(changeReadStatusButton);

  tempBook.appendChild(bookDetails);
  tempBook.appendChild(buttonsContainer);

  return tempBook;
}

document.getElementById('book-container').addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('change-status')) {
    // Handle change read status
    const index = target.value;
    toggleReadStatus(index);
  } else if (target.classList.contains('remove-book')) {
    // Handle remove book
    const index = target.value;
    removeBook(index);
  }
});

function toggleReadStatus(index) {
  const book = myLibrary[index];
  book.read = book.read === 'yes' ? 'no' : 'yes';
  loopThroughLibrary();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  indexBooks();
  loopThroughLibrary();
}

function loopThroughLibrary() {
  const bookContainer = document.getElementById('book-container');
  bookContainer.textContent = '';

  myLibrary.forEach((book) => {
    bookContainer.appendChild(createBookCard(book));
  });
}

loopThroughLibrary();

const newBookButton = document.getElementById('new-book-button');
const newBookDialog = document.getElementById('new-book-dialog');

newBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
})

const addBookToLibraryButton = document.getElementById('add-book-to-library');


function getReadValue() {
  const fieldsetInput = document.querySelector('fieldset input[type="radio"]:checked');
  return fieldsetInput.value;
}

function closeDialogWindow() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');

  if (title.value !== '' && author.value !== '' && pages.value !== ''){
    newBookDialog.close();
    document.getElementById('book-form').reset();
  }
}

addBookToLibraryButton.addEventListener('click', (event) => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const readStatus = getReadValue();
  
  const bookToAdd = new Book(title.value, author.value, pages.value, readStatus);

  addBookToLibrary(bookToAdd);

  loopThroughLibrary();

  closeDialogWindow();

  // event.preventDefault();
});
