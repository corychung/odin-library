(function() { 

    function Book(title, author, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    };

    let library = {
        library:[],
        init() {
            library.cacheDOM();
            library.bindEvents();
            library.render();
        },
        cacheDOM() {
            this.form = document.querySelector(".add-form")
            this.addBookDialog = document.querySelector(".add-book-container")
            this.addBookButton = document.querySelector("#add-button")  
            this.bookGrid = document.querySelector(".book-grid")
        },
        grabDialogInput() {
            this.bookName = document.querySelector("#title").value;
            this.bookAuthor = document.querySelector("#author").value;
            this.bookPages = document.querySelector("#pages").value;
            this.bookRead = document.querySelector("#read").checked;
        },
        bindEvents() {
            this.addBookButton.addEventListener("click", () => this.showDialog());
            this.form.addEventListener("submit", (event) => this.addBook(event));
            this.bookGrid.addEventListener("click", (event) => {
                if (event.target.classList.contains("read-button")) {
                    this.toggleRead(event);
                }
                if (event.target.classList.contains("remove-button")) {
                    this.removeBook(event);
                }
            });
        },
        render() {
            this.bookGrid.innerHTML = "";
            for (let book of this.library) {
                let bookCard = document.createElement("div")
                    bookCard.classList.add("book-card");
                    bookCard.setAttribute("data",this.library.indexOf(book));
                    bookCard.innerHTML = 
                        `<p class="title">`+book.title+`</p>
                        <p class="author">By: `+book.author+`</p>
                        <p class="pages">`+book.pages+` pages</p>
                        <button type="button" class="read-button`+((book.read)?` is-read">Read`:` is-unread">Unread`)+`</button>
                        <button type="button" class="remove-button">Remove</button>`;
                this.bookGrid.appendChild(bookCard);    
            }
        },
        addBook(event) {
            event.preventDefault();
            this.grabDialogInput();
            if (!this.bookName||!this.bookAuthor||!this.bookPages) {return;}
            this.library.push(new Book(this.bookName, this.bookAuthor, this.bookPages, this.bookRead));
            this.addBookDialog.close();
            this.form.reset();
            this.render();
        },
        removeBook(event) {
            let index = event.target.parentElement.getAttribute("data");
            this.library.splice(index,1);
            this.render();
        },
        toggleRead(event) {
            let index = event.target.parentElement.getAttribute("data");
            let bookToChange = this.library[index];
            bookToChange.read = bookToChange.read ? false : true;
            this.render();
        },
        showDialog() {
            this.addBookDialog.showModal();
        },
    }
    
    library.init(); 

})();

