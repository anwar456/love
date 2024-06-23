// components/PaginationComponent.js
import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
                {i}
            </Pagination.Item>
        );
    }

    const prevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <Pagination>
            <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
            {pageNumbers}
            <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
        </Pagination>
    );
};

export default PaginationComponent;
