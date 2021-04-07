'use strict'

const KEY = 'books';
const PAGE_SIZE = 5;
const gGenre = ['horor', 'kids', 'science fiction', 'non-fiction', 'novel', 'action', 'drama', 'comedy', 'study', 'fantasy', 'thriller'];
var gPageIdx = 0;
var gId = 1;
var gBooks = [
    {
        id: gId++,
        price: 20,
        name: 'The Count of Monte Cristo',
        author: 'Alexandre Dumas',
        genre: 'novel',
        qnt: 10,
        summarey: 'The story takes place in France, Italy, and islands in the Mediterranean during the historical events of 1815–1839: the era of the Bourbon Restoration through the reign of Louis-Philippe of France. It begins on the day that Napoleon left his first island of exile, Elba, beginning the Hundred Days period when Napoleon returned to power. The historical setting is a fundamental element of the book, an adventure story centrally concerned with themes of hope, justice, vengeance, mercy, and forgiveness. It centers on a man who is wrongfully imprisoned, escapes from jail, acquires a fortune, and sets about exacting revenge on those responsible for his imprisonment.\nBefore he can marry his fiancée Mercédès, Edmond Dantès, first mate of the Pharaon, is falsely accused of treason, arrested, and imprisoned without trial in the Château d\'If, a grim island fortress off Marseille. A fellow prisoner, Abbé Faria, correctly deduces that his jealous rival Fernand Mondego, envious crewmate Danglars, and double-dealing magistrate De Villefort turned him in. Faria inspires his escape and guides him to a fortune in treasure. As the powerful and mysterious Count of Monte Cristo (Italy), he arrives from the Orient to enter the fashionable Parisian world of the 1830s and avenge himself on the men who conspired to destroy him.',
    },
    {
        id: gId++,
        price: 25,
        name: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J. K. Rowling',
        genre: 'fantasy',
        qnt: 7,
        summarey: ' The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old. The book was first published in the United Kingdom on 26 June 1997 by Bloomsbury.\nIt was published in the United States the following year by Scholastic Corporation under the title Harry Potter and the Sorcerer\'s Stone. It won most of the British book awards that were judged by children and other awards in the US. The book reached the top of the New York Times list of best-selling fiction in August 1999 and stayed near the top of that list for much of 1999 and 2000. It has been translated into at least 73 other languages, and has been made into a feature-length film of the same name, as have all six of its sequels. The novel has sold in excess of 120 million copies.',
    },
    {
        id: gId++,
        price: 29,
        name: 'The Game: Penetrating the Secret Society of Pickup Artists',
        author: 'Neil Strauss',
        genre: 'non-fiction',
        qnt: 12,
        summarey: 'Strauss stumbles across the community while working on an article. Intrigued by the subculture, he starts participating in the online discussion groups, mainly out of frustration with his own romantic life. As he becomes more and more involved in the romantic community, Strauss attends a bootcamp conducted by a man identified only as "Mystery". The bootcamp consists of Strauss and other participants approaching women, and then Mystery and his counterpart, Sinn, giving them corrective advice on their behaviors, body language, and what to say. Strauss learns habits that, as he sees it, are often basic—and should have been taught to him by society in the first place.\nThe book then narrates the journey of how Strauss goes through the stages of becoming a pickup artist (a description of the members of the community) and gains the pseudonym "Style". He befriends many of the pickup artists, particularly Mystery. A good deal of the book focuses on how to obtain the elusive upper hand, or just hand, in a relationship. Strauss advocates various methods, mostly from the point of view of heterosexual men. He offers further guidelines for the process of seduction, which include preparing things to say before going out and telling groups of women surreptitiously impressive stories. He also uses "false time constraints" (a reason that the conversation could end very soon) to put the woman of interest in a situation where she must convince the man she is interesting, discusses how to very slowly increase the amount of physical contact, and more.\nStrauss tells the story of his success, the spreading of the romantic community itself, and his life at "Project Hollywood", a high-end mansion and a lifestyle plan shared by Strauss, Mystery, Playboy, Papa, Tyler Durden, Herbal, and other members of the seduction community. He details how rivalries and animosity between members of the community lead to Project Hollywood\'s collapse and documents the start of "Real Social Dynamics" led by Tyler Durden and Papa. By the end of his story, Strauss concludes that a life of nothing but picking up women is "for losers", and he advocates incorporating pickup artist methods into a more balanced life.',
    }
]

_createBooks();

function getBooks() {
    return gBooks
}

function removeBook(bookId) {
    var bookIdx = getBookIdx (bookId)
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, author, price, genre, qnt, summarey) {
    var newBook = _createBook(name, author, price, genre, qnt, summarey);
    gBooks.push(newBook);
    _saveBooksToStorage()
}


function updateBook(bookId, key, newValue) {
    var bookIdx = getBookIdx (bookId)
    gBooks[bookIdx][key] = newValue;
    _saveBooksToStorage()
}

function _createBook(name = '', author = '', price = 0, genre = '', qnt = 0, summarey = '') {
    return {
        id: gId++,
        name: name,
        author: author,
        price: +price,
        genre: genre,
        qnt: +qnt,
        summarey: summarey,
    }
}

function _createBooks() {
var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < gBooks.length; i++) {
            books.push(_createBook(gBooks[i].name, gBooks[i].author, gBooks[i].price, gBooks[i].genre, gBooks[i].qnt, gBooks[i].summarey));
        }
    }
    gBooks = books;
    gId = books.length;
    _saveBooksToStorage();
}

function getBookIdx (bookId){
    return gBooks.findIndex((book) => { return bookId === book.id })
}

function getBookById(bookId) {
    return gBooks.find((book) => { return bookId === book.id });
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}




