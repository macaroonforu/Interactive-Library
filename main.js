let myLibrary = []; 

//This function will remove the book from the library 
function removeBook(e){
    const bookShelf = document.querySelector(".book-shelf");
    let pressedBook = e.srcElement.parentElement.parentElement;
    let books = bookShelf.getElementsByClassName("book");
    myLibrary.splice(pressedBook.id, 1); 
    bookShelf.removeChild(pressedBook);  
    let newBooks = bookShelf.getElementsByClassName("book");
    for(let i = 0; i<(myLibrary.length); i++){
        newBooks[i].id = i;
    }
}

//Need to add a function that toggles if a book is read or not 
function toggleRead(e){ 
    let pressedBook = e.srcElement.parentElement.parentElement;
    object = myLibrary[pressedBook.id]; 
   if(object.state == "Read"){
        object.state = "Not Read";
   }
   else{
    object.state = "Read"; 
   }
    display(myLibrary); 
}

//This function will set all the IDs properlly and then display each book; 
function display(myLibrary){
    const bookShelf = document.querySelector(".book-shelf"); 
     //clear the shelf 
    bookShelf.innerHTML = ""; 
    //make each book icon fresh 
    for(let i=0; i<(myLibrary.length); i++){
       // console.log("creating icon for this status: "+ myLibrary[i].status); 
        myLibrary[i].createBookIcon(); 
    }
    //Set book Ids and Display
    let books = bookShelf.getElementsByClassName("book");
    for(let i=0; i<(myLibrary.length); i++){ 
        books[i].id = i; 
        books[i].style.display = "grid";
    }
}

function Book(title, author, length, state){
    this.title = title;
    this.author = author; 
    this.length = length; 
    this.state = state;  


    this.log = function(){
        console.log("Title: " + title  + "\nAuthor: " + author + "\nNumber of Pages: " + length + "\nstatus: " + state); 
    }

    this.createBookIcon = function(){  
        let newBookIcon; 
        const bookShelf = document.querySelector(".book-shelf");
        newBookIcon = document.querySelector(".book-icon-template").cloneNode(true);
        newBookIcon.classList.add("book");
        const data = ["Title: " + this.title, "Author: " + this.author, "Length: " + this.length + " pages", "Status: " + this.state] ; 
        for(let i = 0; i<4; i++){
            newBookIcon.firstElementChild.children[i].textContent = data[i]; 
        }
        if(this.state== "Read"){
            newBookIcon.firstElementChild.children[3].style.backgroundColor = "lime"; 
        }
        else{
            newBookIcon.firstElementChild.children[3].style.backgroundColor = "red";
        }
        console.log("Created Book Icon for the above book: " + newBookIcon); 
        let read = newBookIcon.querySelector(".read-button"); 
        let deleted = newBookIcon.querySelector("#remove"); 
        read.addEventListener("click", toggleRead); 
        deleted.addEventListener("click", removeBook); 
        bookShelf.appendChild(newBookIcon);
    }

    this.changeState = function(newState){
        console.log("entered"); 
        this.state = newState; 
        console.log(this.state); 
        console.log("this is the object after swap: "); 
        console.log(this.state);
        this.log(); 
    }
}

//This function simply creates a book object based on what we input into the form 
//and adds it to the library, no displaying
document.querySelector("#create").addEventListener('click', addBookToLibrary); 
function addBookToLibrary(e){
    title = document.getElementById("book-title").value;
    author = document.getElementById("book-author").value;
    length = document.getElementById("book-length").value;
    if((document.getElementById("book-status").checked)==true){
        state = "Read"; 
    }
    else{
        state = "Not Read"; 
    }
    const newBook = new Book(title, author, length, state);
    myLibrary.push(newBook);
    newBook.log();  
    display(myLibrary);  
}






