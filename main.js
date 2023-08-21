let myLibrary = []; 
let id = 0; 
class LocalStorageService {
    #keys = {
      books: 'books',
    };
    constructor() {
      this.storage = window.localStorage;
    }
    addBook(book) {
      const Books = this.getBooks();
      Books.push(book);
      this.setBooks(Books);
    }
    getBooks() {
      return JSON.parse(this.storage.getItem(this.#keys.books)) || [];
    }
    getBook(id) {
    const books = this.getBooks();
    const book = books.find((book)=>String(book.id) === String(id));
    console.log(book); 
    return book; 
    }
    setBooks(books) {
      this.storage.setItem(this.#keys.books, JSON.stringify(books));
    }
    removeBook(book) {
      const books = this.getBooks();
      const index = books.indexOf(book);
      books.splice(index, 1);
      this.setBooks(books);
    }
    clear() {
      this.storage.clear();
    }
  }

const storageService = new LocalStorageService();

//This function will remove the book from the library 
function removeBook(e){
    const bookShelf = document.querySelector(".book-shelf");
    let pressedBook = e.srcElement.parentElement.parentElement;
    let books = bookShelf.getElementsByClassName("book");
    const savedbooks = storageService.getBooks(); 
    savedbooks.splice(pressedBook.id, 1); 
    storageService.setBooks(savedbooks); 
    display(storageService.getBooks()); 
    let newBooks = bookShelf.getElementsByClassName("book");
    for(let i = 0; i<(storageService.getBooks().length); i++){
        newBooks[i].id = i;
    }
}

//Need to add a function that toggles if a book is read or not 
function toggleRead(e){ 
    let pressedBook = e.srcElement.parentElement.parentElement;
    const savedbooks = storageService.getBooks(); 
    const object = savedbooks.splice(Number(pressedBook.id), 1); 
    storageService.setBooks(savedbooks); //Delete the old book 
    const storage = storageService.getBooks();  
   if(object[0].state === "Read"){
        object[0].state = "Not Read";
   }
   else{
    object[0].state = "Read"; 
   } //change the book 
   const storage2 = storage.splice(Number(pressedBook.id), 0, object[0]);
   storageService.setBooks(storage);
   display(storageService.getBooks()); 
   return 
}


//This function will set all the IDs properlly and then display each book; 
function display(myLibrary){
    const bookShelf = document.querySelector(".book-shelf"); 
     //clear the shelf 
    bookShelf.innerHTML = ""; 
    //make each book icon fresh 
    for(let i=0; i<(myLibrary.length); i++){
        //console.log(myLibrary[i]); 
       //console.log("creating icon for this status: "+ myLibrary[i].state); 
       createBookIcon(myLibrary[i]); 
    }
    //Set book Ids and Display
    let books = bookShelf.getElementsByClassName("book");
    let savedBooks = storageService.getBooks(); 
    for(let i=0; i<(myLibrary.length); i++){ 
        savedBooks[i].id = i; 
        books[i].id = i; 
        books[i].style.display = "grid";
    }
}

function createBookIcon(book){  
    let newBookIcon; 
    const bookShelf = document.querySelector(".book-shelf");
    newBookIcon = document.querySelector(".book-icon-template").cloneNode(true);
    newBookIcon.id = Number(book.id); 
    newBookIcon.classList.add("book");
    const data = ["Title: " + book.title, "Author: " + book.author, "Length: " + book.length + " pages", "Status: " + book.state] ; 
    for(let i = 0; i<4; i++){
        newBookIcon.firstElementChild.children[i].textContent = data[i]; 
    }
    if(book.state== "Read"){
        newBookIcon.firstElementChild.children[3].style.backgroundColor = "lime"; 
    }
    else{
        newBookIcon.firstElementChild.children[3].style.backgroundColor = "red";
    } 
    let read = newBookIcon.querySelector(".read-button"); 
    let deleted = newBookIcon.querySelector("#remove"); 
    read.addEventListener("click", toggleRead); 
    deleted.addEventListener("click", removeBook); 
    bookShelf.appendChild(newBookIcon);
}

function Book(title, author, length, state, id){
    this.id = id; 
    this.title = title;
    this.author = author; 
    this.length = length; 
    this.state = state;  
    
    this.log = function(){
        console.log("Title: " + title  + "\nAuthor: " + author + "\nNumber of Pages: " + length + "\nstatus: " + state); 
    }
    this.changeState = function(newState){
        this.state = newState; 
    }
}

function clear(e){
    console.log(e); 
    storageService.clear(); 
    console.log(storageService.getBooks()); 
    display(storageService.getBooks()); 
}

//This function simply creates a book object based on what we input into the form 
//and adds it to the library, no displaying
document.querySelector("#create").addEventListener('click', addBookToLibrary); 
document.querySelector('#clear').addEventListener('click', clear); 
function addBookToLibrary(){
    title = document.getElementById("book-title").value;
    author = document.getElementById("book-author").value;
    length = document.getElementById("book-length").value;
    if((document.getElementById("book-status").checked)==true){
        state = "Read"; 
    }
    else{
        state = "Not Read"; 
    }
    const newBook = new Book(title, author, length, state, id);
    id++; 
    myLibrary.push(newBook); 
    storageService.addBook(newBook);
    const books = storageService.getBooks();
    display(books);  
}
display(storageService.getBooks()); 
let form = document.getElementById("form");
function handleForm(event) { 
    event.preventDefault();
    addBookToLibrary(); 
 } 
form.addEventListener('submit', handleForm);

