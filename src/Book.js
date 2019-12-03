import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
    const {thumbnail, title, shelf, bookshelves, handleChange} = props,
    authors = props.authors.join('\n');

    return (
        <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
            <div className="book-shelf-changer">
                <select defaultValue={shelf} onChange={handleChange}>
                    <option value="move" disabled>Move to...</option>
                        {
                            bookshelves.map((shelf)=>(
                                <option key={shelf.id} value={shelf.id}>{shelf.name}</option>
                            ))
                        }
                    <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors" style={{whiteSpace: "pre-line"}}>{authors}</div>
        </div>
    )
}

Book.propTypes = {
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    authors: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}


export default Book;