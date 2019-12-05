import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import SearchForm from './SearchForm';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
    state = {
        searchResults: []
    }

    handleSearch = (query) => {
        if (query.length ) {
            BooksAPI.search(query).then((data) => {
                // Check if result is array
                if (Array.isArray(data)) {
                    this.setState({
                        searchResults: data
                    })
                }
            })
        } else {
            this.setState({
                searchResults: []
            })
        }
    }

    render() {
        const { bookshelves, handleChange, savedBooks } = this.props;
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <SearchForm handleSearch={this.handleSearch} />
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.searchResults.map((book) => {
                                const saved = savedBooks.find((savedBook) => savedBook.id === book.id);
                                return(
                                    <li key={book.id}>
                                        <Book
                                            id={book.id}
                                            thumbnail={book.imageLinks && book.imageLinks.smallThumbnail} 
                                            title={book.title} 
                                            authors={book.authors ? book.authors : []} 
                                            shelf={saved ? saved.shelf : 'none'}
                                            bookshelves={bookshelves}
                                            handleChange={handleChange}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

SearchBooks.propTypes = {
    bookshelves: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
    savedBooks: PropTypes.array.isRequired 
}

export default SearchBooks;