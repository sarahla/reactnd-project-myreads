import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component{
    state = {
        searchTerm: ''
    }

    clearQuery = () => {
        this.updateQuery('')
    }

    handleChange = (e) => {
        console.log(e.target.value);

        this.setState({
            searchTerm: e.target.value
        }, () => {
            this.props.handleSearch(this.state.searchTerm);
        })
    }
    
    render() {
        return (
            <div className="search-books-input-wrapper">
                {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input onChange={this.handleChange} value={this.state.searchTerm} type="text" placeholder="Search by title or author"/>
            </div>
        )
    }
}

SearchForm.propTypes = {
    handleSearch: PropTypes.func.isRequired
}

export default SearchForm;