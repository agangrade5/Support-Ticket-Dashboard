const Pagination = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <nav className="d-flex justify-content-center mt-3">
            <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(page - 1)}
                    >
                        Prev
                    </button>
                </li>

                <li className="page-item active">
                    <span className="page-link">
                        {page} / {totalPages}
                    </span>
                </li>

                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(page + 1)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
