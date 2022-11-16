import React, { useState } from "react"
import styled from "styled-components"

import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"

import Pagination from "./Pagination"

function VehicleTableComponent({ allResidents }) {
	const [edit, setEdit] = useState(false)
	const [searchText, setSearchText] = useState("")
	const [currentRow, setCurrentRow] = useState()
	const editHandler = (e, row) => {
		e.preventDefault()
		setCurrentRow(row)
		setEdit(true)

		console.log("editing cell: ", row)
	}

	const searchHandler = (e) => {}

	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(5)

	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

	// Records to be displayed on the current page
	const currentRecords =
		allResidents && allResidents.slice(indexOfFirstRecord, indexOfLastRecord)

	const nPages = allResidents && Math.ceil(allResidents.length / recordsPerPage)

	return (
		<Table>
			<div className="search">
				<TextField
					id="outlined-basic"
					className="search-box"
					placeholder="Search"
					onChange={(e) => {
						searchHandler(e)
					}}
					variant="outlined"
					size="small"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon className="search-icon" />
							</InputAdornment>
						),
					}}
				/>
			</div>
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
			<Pagination
				nPages={nPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</Table>
	)
}

export default VehicleTableComponent

const Table = styled.div`
	width: 45%;
	.search {
		margin: 4% 0 0% 5%;
		display: flex;
		align-items: center;
		padding: 5px 0;
		width: 40%;
	}
	.search-box {
		padding: 0 !important;
	}

	.table-container {
		margin: 0px 0 0.5% 5%;
		height: 270px;
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
				padding: 3px !important;

				border: 1px solid lightgray;
				border-radius: 10px;
			}
		}

		#edit {
			/* background-color: lightgreen; */
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