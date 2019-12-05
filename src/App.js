import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf';
import SearchBooks from './SearchBooks';

const bookshelves = [
  {
    id: 'currentlyReading',
    name: 'Currently Reading'
  },
  {
    id: 'wantToRead',
    name: 'Want to Read'
  },
  {
    id: 'read',
    name: 'Read'
  }
]

class BooksApp extends React.Component {
  state = {
    books: []
  }

  fetchAllBooks = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data
      })
    })
  }

  updateBookshelf = (book, id) => {
    BooksAPI.update(book, id).then((data) => {
      this.fetchAllBooks();
    });
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/search">
              <SearchBooks savedBooks={this.state.books} bookshelves={bookshelves} handleChange={this.updateBookshelf} />
            </Route>
            <Route path="/" exact>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {
                      bookshelves.map((bookshelf) => (
                        <Bookshelf 
                          key={bookshelf.id} 
                          id={bookshelf.id} 
                          name={bookshelf.name} 
                          books={this.state.books}
                          bookshelves={bookshelves}
                          handleChange={this.updateBookshelf}
                        />
                      ))
                    }
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search"><button>Add a book</button></Link>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp
