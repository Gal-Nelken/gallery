'use strict'

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHTMLs = books.map((book) => {
        return `
    <div class="book" data-id=${book.id}>
    <tr>
     <td class="id">${getBookIdx(book.id) + 1}</td>
     <td class="title">${book.name}</td>
     <td class="author">${book.author}</td>
        <td class="price">${book.price}$</td>
        <div class="act-btn">
            <td class="actions">
                <button class="expand" onClick='onReadBook(${book.id})' >Read</button>
                <button class="update" onClick='onUpdateBook(${book.id})'>Update</button>
                <button class="remove" onClick='onRemoveBook(${book.id})'>Delete</button>
            </td>
        </div>
    </tr>
    <div/>
    `
    })
    document.querySelector('.book-container').innerHTML = strHTMLs.join('')
}

function renderModal(strHTML) {
    var elModal = document.querySelector('.modal')
    elModal.innerHTML = strHTML;
    elModal.style.display = 'flex';
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
    console.log('delete');
}

function onAddBook() {
    var strHTML = `
    <h1>Create a New Book</h1>
    <label for="">Book Name:
        <input type="text" name="name" id="name" size="25">
    </label>
    <label for="author">Author Name:
        <input type="text" name="author" id="author" size="25">
    </label>
    <label for="genre">Genre:
        <input type="text" name="genre" id="genre" size="30">
    </label>
    <div class="row-modal">
        <label for="price">Price:
            <input type="number" min="0" name="price" id="price">
        </label>
        <label for="qnt">Quntity:
            <input type="number" min="0" name="qnt" id="qnt">
        </label>
    </div>
    <label for="summary">Summary</label>
    <textarea form="summary" name="summary" id="summary" rows="5"></textarea>
    <div class="row-modal">
        <button onclick="onSubmitAddBook()">Submit</button>
        <button onclick="onCloseModal()">Close</button>
    </div>
    `;
    renderModal(strHTML);
}

function onSubmitAddBook() {
    var elName = document.querySelector('input[name=name]');
    var elAuthor = document.querySelector('input[name=author]');
    var elPrice = document.querySelector('input[name=price]');
    var elGenre = document.querySelector('input[name=genre]');
    var elQnt = document.querySelector('input[name=qnt]');
    var elSummary = document.querySelector('textarea[name=summary]');
    var name = elName.value;
    var author = elAuthor.value;
    var price = elPrice.value;
    var genre = elGenre.value;
    var qnt = elQnt.value;
    var summary = elSummary.value;
    addBook(name, author, price, genre, qnt, summary);
    onCloseModal();
    renderBooks();
}

function onSubmitUpdate(bookId) {
    var elValue = document.querySelector('input[name=updateValue]');
    var elKey = document.querySelector('select[name=updateKey]');
    var newValue = elValue.value;
    var key = elKey.value;
    updateBook(bookId, key, newValue);
    renderBooks ();
    onCloseModal();
}

function onSetKey() {

}

function onUpdateBook(bookId) {
    var strHTML = `
    <h1>Update Price Or Quntity</h1>
    <select name="updateKey">
        <option value="price">Price </option>
        <option value="qnt">Quntity</option>
        </select>
    <input type="number" min="0" name="updateValue" id="updateValue" size="20">
    <div class="row-modal">
        <button onclick="onSubmitUpdate(${bookId})">Submit</button>
        <button onclick="onCloseModal()">Close</button>
    </div>
    `;
    renderModal(strHTML);
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    var strHTML = `
    <h1>${book.name}</h1>
    <h3>${book.author}</h3>
    <p><span>Summary:</span>${book.summarey}</p>
    <div class="row-modal">
        <h4>Quntity:${book.qnt}</h4>
        <h4>Genre: ${book.genre}</h4>
        <h4>Price: ${book.price}$</h4>
    </div>
    <button onclick="onCloseModal()">Close</button>
    `;
    renderModal(strHTML);
}

function onCloseModal() {
    document.querySelector('.modal').style.display = 'none';
}