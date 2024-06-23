import React from 'react';
import { Form } from 'react-bootstrap';

const SearchComponent = ({ searchTerm, onSearchChange }) => {
    return (
        <Form.Control
            type="text"
            className="form-control"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
        />
    );
};

export default SearchComponent;
