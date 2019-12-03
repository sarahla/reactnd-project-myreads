import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

function Shelf(props) {
    const { name, bookshelves, handleChange } = props,
    books = props.books.filter((book)=> book.shelf === props.id);
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map((book) => (
                            <li key={book.id}>
                                <Book 
                                    thumbnail={book.imageLinks.smallThumbnail} 
                                    title={book.title} 
                                    authors={book.authors} 
                                    shelf={book.shelf}
                                    bookshelves={bookshelves}
                                    handleChange={handleChange}
                                />
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    bookshelves: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Shelf;