//Book class: Represents a book

class Book {
    constructor(title,auther,isbn){
        this.title = title;
        this.auther = auther;
        this.isbn = isbn;
    }
}

//UI class: handle UI task

class UI {
    static displayBooks(){
        const books = Store.getBooks();;

        books.forEach(function(book){
            UI.addBookToList(book);
        });
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.auther}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='btn btn-sm btn-danger delete'>x</a></td>
        `;

        list.appendChild(row);

    }

    static showAlert(message,className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        //vanishing alert box

        setTimeout(()=> document.querySelector('.alert').remove(),2500);
    }

    static removeBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#auther').value = '';
        document.querySelector('#isbn').value = '';
    }
}
//Store Class: Handle storage

class Store {
    static getBooks(){
        let books;

        if(localStorage.getItem('books')===null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}

//Event: Display a book
document.addEventListener('DOMContentLoaded', UI.displayBooks());

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{

    //Prevent actual submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const auther = document.querySelector('#auther').value;
    const isbn = document.querySelector('#isbn').value;

    //validation

    if(title === '' || auther === '' || isbn === ''){
        UI.showAlert('Please fill all the fields','danger');
    }
    else
    {
        //Instatiate BooK
        const book = new Book(title,auther,isbn);

        //Add book to list UI
        UI.addBookToList(book);

        //Add book to store
        Store.addBook(book);

        //show success message
        UI.showAlert('Book Added Succesfully..!!','success');
 
        //Clear fields
        UI.clearFields();
    }
   

});

//Event: Remove a book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    //Remove book from UI
    UI.removeBook(e.target);

    //Remove book from storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    //show success message
    UI.showAlert('Book Removed Successfully..!!','success');
});