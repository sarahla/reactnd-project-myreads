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


class BooksApp extends React.Component {

  constructor(props){
    super(props);
    this.updateBookshelf = this.updateBookshelf.bind(this);
    this.fetchAllBooks = this.fetchAllBooks.bind(this);
  }

  state = {
    books: [],
    bookshelves: [
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
  }

  fetchAllBooks() {
    BooksAPI.getAll().then((data) => {
      this.setState({
        books: data
      })
    })
  }

  updateBookshelf(book, id) {
    BooksAPI.update(book, id).then(() => {
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
              <SearchBooks bookshelves={this.state.bookshelves} handleChange={this.updateBookshelf} />
            </Route>
            <Route path="/" exact>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {
                      this.state.bookshelves.map((bookshelf) => (
                        <Bookshelf 
                          key={bookshelf.id} 
                          id={bookshelf.id} 
                          name={bookshelf.name} 
                          books={this.state.books}
                          bookshelves={this.state.bookshelves}
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
