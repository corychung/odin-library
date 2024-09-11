const myLibrary = [];
let form = document.querySelector(".add-form")
let addBookDialog = document.querySelector(".add-book-container")
let addBookButton = document.querySelector("#add-button")
let bookGrid = document.querySelector(".book-grid")

function Book(name, author, pages, read) {
    this.author = author;
    this.name = name;
    this.pages = pages;
    this.read = read;
}

function syncLibraryDOM() {
    bookGrid.innerHTML = "";
    let bookCard = "";
    let addBookCard = "";
    for (let book of myLibrary) {
        bookCard = '<p class="title">'+book.name;
        bookCard += '</p><p class="author">By: '+book.author;
        bookCard += '</p><p class="pages">'+book.pages + ' pages';
        bookCard += '</p><button type="button" class="read-button'; 
        bookCard += (book.read) ? ' is-read">Read' : ' is-unread">Unread';
        bookCard += '</button><button type="button" class="remove-button">Remove</button>';
        addBookCard = document.createElement("div")
        addBookCard.classList.add("book-card");
        addBookCard.innerHTML = bookCard;
        addBookCard.setAttribute("data",myLibrary.indexOf(book));
        bookGrid.appendChild(addBookCard);
    }
}

addBookButton.addEventListener("click", () => {
    form.reset();
    addBookDialog.showModal();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let bookName = document.querySelector("#title").value;
    let bookAuthor = document.querySelector("#author").value;
    let bookPages = document.querySelector("#pages").value;
    let bookRead = document.querySelector("#read").checked;
    if (!bookName||!bookAuthor||!bookPages) {return;}
    let bookToAdd = new Book(bookName, bookAuthor, bookPages, bookRead);
    myLibrary.push(bookToAdd);
    addBookDialog.close();
    syncLibraryDOM();
})

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("read-button")) {
        let bookToggleRead = myLibrary[e.target.parentElement.getAttribute("data")];
        if (bookToggleRead.read == true) { 
            e.target.style["background-color"] = "#FF8E8E";
            e.target.textContent = "Unread";  
            bookToggleRead.read = false;  
        }
        else {
            e.target.style["background-color"] = "#90FF8E";
            e.target.textContent = "Read";    
            bookToggleRead.read = true;
        }

    }
    if (e.target.classList.contains("remove-button")) {
        let indexToRemove = e.target.parentElement.getAttribute("data");
        myLibrary.splice(indexToRemove,1);
        syncLibraryDOM();
    }
    console.log(myLibrary)
})


