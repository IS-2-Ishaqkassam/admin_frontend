import React from "react"
import styled from "styled-components"

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
	const pageNumbers = nPages && [...Array(nPages + 1).keys()].slice(1)

	const nextPage = () => {
		if (currentPage !== nPages) setCurrentPage(currentPage + 1)
	}
	const prevPage = () => {
		if (currentPage !== 1) setCurrentPage(currentPage - 1)
	}
	return (
		<Parent>
			<nav>
				<ul className="pagination justify-content-center ">
					<li className="page-item">
						<a className="page-link" onClick={prevPage} href="#">
							Previous
						</a>
					</li>
					{pageNumbers &&
						pageNumbers.map((pgNumber) => (
							<li
								key={pgNumber}
								className={`page-item ${
									currentPage == pgNumber ? "active" : ""
								} `}
							>
								<a
									onClick={() => setCurrentPage(pgNumber)}
									className="page-link"
									href="#"
								>
									{pgNumber}
								</a>
							</li>
						))}
					<li className="page-item">
						<a className="page-link" onClick={nextPage} href="#">
							Next
						</a>
					</li>
				</ul>
			</nav>
		</Parent>
	)
}

export default Pagination

const Parent = styled.div`
	nav {
		margin: 1% 0 0.5% 5%;
	}
`
