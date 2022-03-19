import React from "react";
import PropTypes from "prop-types";

import PaginationMUI from "@mui/material/Pagination";

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  return (
    <PaginationMUI
      count={pagesCount}
      color="primary"
      onChange={(event, value) => onPageChange(value)}
      page={currentPage}
      hidePrevButton
      hideNextButton
    />
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
