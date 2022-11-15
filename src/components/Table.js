import React from "react"
import styled from "styled-components"

function TableComponent({ currentRecords }) {
	return (
		<Table>
			<div className="table-container">
				<div className="table-headers">
					<p className="name">Name</p>
					<p className="email">Email</p>
					<p className="house-number">House Number</p>
					<p className="operations">Operations</p>
				</div>
				<div className="row-container">
					{currentRecords ? (
						currentRecords.map((resident, index) => (
							<div
								key={index}
								className="table-rows"
								onClick={() => {
									console.log("row clicked: ", currentRecords[index])
								}}
							>
								<div
									className="name"
									onClick={() => {
										// console.log(index + resident.resident_name)
									}}
								>
									{resident.resident_name}
								</div>
								<div
									className="email"
									onClick={() => {
										// console.log(allResidents[index])
									}}
								>
									{resident.resident_email}
								</div>
								<div
									className="house-number"
									onClick={() => {
										// console.log(index + resident.resident_house_number)
									}}
								>
									{resident.resident_house_number}
								</div>
								<div className="operations">
									<p id="edit">Edit</p>
									<p id="delete">Delete</p>
								</div>
							</div>
						))
					) : (
						<p></p>
					)}
				</div>
			</div>
		</Table>
	)
}

export default TableComponent

const Table = styled.div`
	.table-container {
		/* display: flex; */
		width: 40%;
		border: 1px solid grey !important;
	}

	.table-headers {
		font-weight: bold;
		/* width: 98%; */

		p {
			padding: 6px !important;
		}
	}
	.name,
	.email,
	.house-number,
	.operations {
		padding: 6px;
	}

	.row-container {
		height: 30%;
	}

	.table-headers {
		/* width: 38% !important; */
		display: flex;
	}
	.table-rows {
		display: flex;
		border-top: 1px solid grey;
		border-bottom: 1px solid grey;
		/* width: 40%; */
	}

	.table-rows,
	.table-headers {
		.name {
			/* border: 1px solid black; */
			width: 30%;
			border-right: 1px solid lightgrey;
		}
		.email {
			width: 34%;
			border-right: 1px solid lightgrey;

			/* border: 1px solid black; */
		}
		.house-number {
			/* border: 1px solid black; */
			width: 18%;
			border-right: 1px solid lightgrey;
		}
		.operations {
			display: flex;
			width: 17%;
			justify-content: space-around;
			align-items: center !important;

			p {
				margin: 0 !important;
				text-align: center;
			}
		}

		#edit {
			:hover {
				background-color: lightgrey;
				cursor: pointer;
			}
		}
		#delete {
			:hover {
				background-color: pink;
				cursor: pointer;
			}
		}
	}
`
