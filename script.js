let myLibrary = [];

function Book(title, author, pages, read) {
    (this.title = title),
        (this.author = author),
        (this.pages = pages),
        (this.read = read),
        (this.info = function () {
            return `${title} by ${author}, ${pages} pages, read: ${read}`;
        });
}

const table = document.querySelector("#table");
const printBook = book => {
    let isRead;
    isRead = book.read ? "yes" : "no";

    const html = `
            <th id="th__title">${book.title}</th>
            <th>${book.author}</th>
            <th>${book.pages}</th>
            <th><button class='read read__${isRead}'>${isRead}</th>
            <th><button class="remove">X</button></th>
    `;
    const bookTR = document.createElement("tr");
    bookTR.innerHTML = html;
    table.append(bookTR);

    bookTR.querySelector(".remove").addEventListener("click", event => {
        event.target.parentElement.parentElement.remove();
    });

    bookTR.querySelector(".read").addEventListener("click", event => {
        if (event.target.classList.contains("read__yes")) {
            event.target.classList.remove("read__yes");
            event.target.classList.add("read__no");
            event.target.innerText = "no";
        } else {
            event.target.classList.remove("read__no");
            event.target.classList.add("read__yes");
            event.target.innerText = "yes";
        }
    });
};

const addBookToLibrary = book => {
    myLibrary.push(book);
    printBook(book);
};

const add = document.querySelector(".add");
const input__title = document.querySelector("#input__title");
const input__author = document.querySelector("#input__author");
const input__pages = document.querySelector("#input__pages");
const input__read = document.querySelector("#input__read");

const eventos = () => {
    add.addEventListener("click", event => {
        event.preventDefault();

        let titles = [...document.querySelectorAll("#th__title")];
        titles = titles.map(titleTH => titleTH.innerText.toLowerCase());

        // Validaciones
        if (
            input__title.value.length <= 0 ||
            input__author.value.length <= 0 ||
            input__pages.value.length <= 0 ||
            input__pages.value <= 0 ||
            input__read.value.length <= 0
        ) {
            console.log("Algun campo no es valido.");
        } else if (titles.includes(input__title.value.toLowerCase())) {
            console.log("Ya hay un libro con ese titulo.");
        } else {
            const newBook = new Book(
                input__title.value,
                input__author.value,
                input__pages.value,
                input__read.checked
            );
            addBookToLibrary(newBook);
        }
        // Vacio los inputs.
        input__title.value = "";
        input__author.value = "";
        input__pages.value = "";
        input__read.checked = false;
    });
};

const init = () => {
    for (let libro of catalogue) {
        addBookToLibrary(libro);
    }
};

// Podría importarse un catalogo inicial. 
const TheHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);
let catalogue = [TheHobbit];

init();
eventos();
