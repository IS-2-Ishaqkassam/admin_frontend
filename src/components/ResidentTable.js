import React, { useState } from "react"
import styled from "styled-components"

function TableComponent({ currentRecords }) {
	const [edit, setEdit] = useState(false)
	const [currentRow, setCurrentRow] = useState()
	const editHandler = (e, row) => {
		e.preventDefault()
		setCurrentRow(row)
		setEdit(true)

		console.log("editing cell: ", row)
	}

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
					{edit == false ? (
						currentRecords &&
						currentRecords.map((resident, index) => (
							<div key={index} className="table-rows">
								<div className="name">{resident.resident_name}</div>
								<div className="email">{resident.resident_email}</div>
								<div className="house-number">
									{resident.resident_house_number}
								</div>
								<div className="operations">
									<p
										id="edit"
										onClick={(e) => {
											editHandler(e, currentRecords[index])
										}}
									>
										Edit
									</p>
									<p id="delete">Delete</p>
								</div>
							</div>
						))
					) : (
						<div className="row-container">
							<div className="table-rows">
								<input className="name" value={currentRow.resident_name} />
								<input className="email" value={currentRow.resident_email} />
								<input
									className="house-number"
									value={currentRow.resident_house_number}
								/>
								<div className="operations">
									<p
										id="save"
										onClick={() => {
											setEdit(false)
											console.log("save")
										}}
									>
										Save
									</p>
									<p
										id="cancel"
										onClick={() => {
											setEdit(false)
											console.log("save")
										}}
									>
										Cancel
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</Table>
	)
}

export default TableComponent

const Table = styled.div`
	.table-container {
		width: 40%;
		height: 270px;
		margin: 5% 0 0.5% 5%;
		border: 1px solid lightgrey !important;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	}

	.table-headers {
		font-weight: bold;

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
		display: flex;
		height: 45px;
	}
	.table-rows {
		display: flex;
		border-top: 1px solid grey;
		border-bottom: 1px solid grey;
		height: 45px;

		input {
			/* outline: none; */
			/* border: none; */
			/* background-color: lightgray; */

			:focus {
				/* outline: none; */
			}
		}
	}

	.table-rows {
		.name {
			width: 30%;
			display: flex;
			align-items: center !important;
			border-right: 1px solid lightgrey;
		}
		.email {
			width: 34%;
			border-right: 1px solid lightgrey;
			display: flex;
			align-items: center !important;
		}
		.house-number {
			width: 18%;
			border-right: 1px solid lightgrey;
			display: flex;
			align-items: center !important;
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
		#save {
			:hover {
				background-color: lightgreen;
				cursor: pointer;
			}
		}
		#delete,
		#cancel {
			:hover {
				background-color: pink;
				cursor: pointer;
			}
		}
	}

	.table-headers {
		.name {
			width: 30%;
			display: flex;
			justify-content: space-around;
			align-items: center !important;
			border-right: 1px solid lightgrey;
		}
		.email {
			width: 34%;
			border-right: 1px solid lightgrey;
			display: flex;
			justify-content: space-around;
			align-items: center !important;
		}
		.house-number {
			width: 18%;
			border-right: 1px solid lightgrey;
			display: flex;
			justify-content: space-around;
			align-items: center !important;
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
