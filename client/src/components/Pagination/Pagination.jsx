import React from 'react';

const Pagination = ({ recordsPerPage, totalRecords, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mb-10">

            <ul className="pagination flex space-x-2">
                <li><button className='p-2 text-md border  font-bold' onClick={() => paginate(1)}>First</button></li>
                <li><button className='p-2 text-md border font-bold' onClick={() => paginate(currentPage>1 ?currentPage-1 : 1)}>Prev</button></li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className={`page-link py-2 px-4 border rounded ${currentPage === number ? 'bg-darkGreen text-white' : 'bg-lightGreen'}`}>
                            {number}
                        </button>
                    </li>
                ))}
                <li><button className='p-2 text-md border font-bold' onClick={() => paginate(currentPage < totalRecords / recordsPerPage ? currentPage+1:totalRecords / recordsPerPage)}>Next</button></li>
                <li><button className='p-2 text-md border font-bold'  onClick={() => paginate(totalRecords / recordsPerPage)}>Last</button></li>
            </ul>
        </nav>
    );
};

export default Pagination;
