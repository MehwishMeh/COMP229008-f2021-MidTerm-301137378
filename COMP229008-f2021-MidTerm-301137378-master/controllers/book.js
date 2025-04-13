// create a reference to the model
let Book = require('../models/book');

// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function(req, res, next) {  
    Book.find((err, bookList) => {
        // console.log(bookList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book/list', {
                title: 'Book List', 
                books: bookList
            })            
        }
    });
}

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Book.findById(id, (err, bookToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/details', {
                title: 'Book Details', 
                book: bookToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add_edit.ejs', {title: 'Add Book', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });    
}

// Processes the data submitted from the Add form to create a new book
module.exports.processAddPage = (req, res, next) => {
    module.exports.processAddPage = (req, res, next) => {
        let newBook = Book({
            "Title": req.body.title,
            "Description": req.body.description,
            "Author": req.body.Author,
            "Genre": req.body.Genre,
            "price": req.body.price
        });
    
        Book.create(newBook, (err, Book) =>{
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                // refresh the book list
                res.redirect('/book/list');
            }
        });    
    }

    // ADD YOUR CODE HERE

}

// Gets a book by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/add_edit', {title: 'Edit Book', book: bookToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });

}

// Processes the data submitted from the Edit form to update a book
module.exports.processEditPage = (req, res, next) => {let id = req.params.id

    let updatedBook = Book({
        "_id": id,
        "Title": req.body.title,
        "Description": req.body.description,
        "Author": req.body.Author,
        "Genre": req.body.Genre,
        "price": req.body.price
    });

    Book.updateOne({_id: id}, updatedBook, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book/list');
        }
    });
    
}

// Deletes a book based on its id.
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/book/list');
        }
    });

}
