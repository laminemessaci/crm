import React from "react";

/**
 * Renders a pagination component based on the current page, items per page, length, and onPageChanged function.
 *
 * @param {Object} props - The props object containing the following properties:
 *   - {number} currentPage - The current page number.
 *   - {number} itemsPerPage - The number of items to display per page.
 *   - {number} length - The total number of items.
 *   - {function} onPageChanged - The function to be called when a page is changed.
 * @return {JSX.Element} The pagination component.
 */
export default function Pagination({
  currentPage,
  itemsPerPage,
  length,
  onPageChanged,
}) {
  const pagesCount = Math.ceil(length / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div className="d-flex justify-content-center my-5 bg-light">
      <ul className="pagination pagination-sm ">
        <li className={"page-item" + (currentPage === 1 ? " disabled" : "")}>
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={"page-item" + (currentPage === page ? " active" : "")}
          >
            <button className="page-link" onClick={() => onPageChanged(page)}>
              {page}
            </button>
          </li>
        ))}

        <li
          className={
            "page-item" + (currentPage === pagesCount ? " disabled" : "")
          }
        >
          <button
            className="page-link"
            onClick={() => onPageChanged(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
}

/**
 * Retrieves a subset of items for a specific page in a paginated list.
 *
 * @param {Array} items - The array of items to be paginated.
 * @param {number} currentPage - The current page number.
 * @param {number} itemsPerPage - The number of items to be displayed per page.
 * @return {Array} The subset of items for the specified page.
 */
Pagination.getData = (items, currentPage, itemsPerPage) => {
  const start = currentPage * itemsPerPage - itemsPerPage;
  return items.slice(start, start + itemsPerPage);
};
