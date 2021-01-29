import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './style.scss';

const PaginationBar = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className='paginationBar'>
      <PaginationItem
        className='paginationBar__item'
        disabled={currentPage === 1 ? true : false}
      >
        <PaginationLink
          className='paginationBar__link'
          first
          onClick={() => paginate(1)}
        />
      </PaginationItem>
      <PaginationItem
        className='paginationBar__item'
        disabled={currentPage === 1 ? true : false}
      >
        <PaginationLink
          className='paginationBar__link'
          previous
          onClick={() => paginate(currentPage - 1)}
        />
      </PaginationItem>
      {pageNumbers.map((num) => (
        <PaginationItem
          key={num}
          className='paginationBar__item'
          active={num === currentPage ? true : false}
        >
          <PaginationLink
            className='paginationBar__link'
            onClick={() => paginate(num)}
          >
            {num}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem
        className='paginationBar__item'
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
      >
        <PaginationLink
          className='paginationBar__link'
          next
          onClick={() => paginate(currentPage + 1)}
        />
      </PaginationItem>
      <PaginationItem
        className='paginationBar__item'
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
      >
        <PaginationLink
          className='paginationBar__link'
          last
          onClick={() => paginate(pageNumbers[pageNumbers.length - 1])}
        />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationBar;
