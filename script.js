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

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function syncLibraryDOM() {
    bookGrid.innerHTML = "";
    let bookCard = "";
    let addBookCard = "";
    for (let book of myLibrary) {
        bookCard = '<p class="title">'+book.name+'</p><p class="author">'+book.author+'</p><p class="pages">'+book.pages+'</p><button type="button" class="read-button">Read</button><button type="button">Remove</button>';
        addBookCard = document.createElement("div")
        addBookCard.classList.add("book-card");
        addBookCard.setAttribute("data-index",() => myLibrary.find(book))
        addBookCard.innerHTML = bookCard;
        console.log(bookCard);
        bookGrid.appendChild(addBookCard);
    }
}

console.log(myLibrary);




addBookButton.addEventListener("click", () => {
    console.log("Modal Opened");
    addBookDialog.showModal();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let bookName = document.querySelector("#title").value;
    let bookAuthor = document.querySelector("#author").value;
    let bookPages = document.querySelector("#pages").value;
    let bookRead = document.querySelector("#read").value;
    if (!bookName||!bookAuthor||!bookPages) {return;}
    let bookToAdd = new Book(bookName, bookAuthor, bookPages, bookRead);
    myLibrary.push(bookToAdd);
    console.log(myLibrary);
    addBookDialog.close();
    syncLibraryDOM();
    form.reset();
})

document.body.addEventListener("click", (e) => {
    if (e.target.classList.includes("read-button")) {
        console.log("CLICK")
    }
})


