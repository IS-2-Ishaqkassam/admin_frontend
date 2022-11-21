import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import Axios from "axios"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"

import Pagination from "./Pagination"

function VehicleTableComponent({ allResidents }) {
	const [edit, setEdit] = useState(false)
	const [searchText, setSearchText] = useState("")
	const [currentRow, setCurrentRow] = useState()

	const vehicle_numberplate_ref = useRef()
	const vehicle_model_ref = useRef()
	const vehicle_make_ref = useRef()
	const vehicle_color_ref = useRef()

	const editHandler = (e, row) => {
		e.preventDefault()
		setCurrentRow(row)
		setEdit(true)

		console.log("editing cell: ", row)
	}

	const saveEditHandler = (e) => {
		e.preventDefault()
		const vehicle_number_plate = vehicle_numberplate_ref.current.value
		const vehicle_model = vehicle_model_ref.current.value
		const vehicle_make = vehicle_make_ref.current.value
		const vehicle_color = vehicle_color_ref.current.value
		console.log("current row saving", currentRow)
		Axios.put(`http://localhost:4000/vehicle/${currentRow._id}`, {
			vehicle_number_plate,
			vehicle_model,
			vehicle_make,
			vehicle_color,
		})
			.then((res) => {
				console.log("saved edit success: ", res)
				setEdit(false)
			})
			.catch((err) => {
				console.log("error saving resident edit", err)
			})
	}

	function flatten(arr) {
		return arr.reduce(function (flat, toFlatten) {
			return flat.concat(
				Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
			)
		}, [])
	}
	var allVehicles = []

	if (allResidents) {
		const vehicleData = []
		for (var i = 0; i < allResidents.length; i++) {
			if (allResidents[i].vehicles.length > 0) {
				for (var j = 0; j < allResidents[i].vehicles[j].length; j++) {}
				vehicleData.push(allResidents[i].vehicles)
			}
		}
		const arrays = flatten(vehicleData)
		allVehicles = arrays
		console.log("arrrays: ", arrays)
		console.log("vehicle table: ", allVehicles)
	}

	const searchHandler = (e) => {}

	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(5)

	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

	const currentRecords =
		allVehicles && allVehicles.slice(indexOfFirstRecord, indexOfLastRecord)

	const nPages = allVehicles && Math.ceil(allVehicles.length / recordsPerPage)

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
					<p className="number-plate">Number Plate</p>
					<p className="make">Make</p>
					<p className="model">Model</p>
					<p className="color">Color</p>
					<p className="operations">Operations</p>
				</div>

				<div className="row-container">
					{edit == false ? (
						currentRecords &&
						currentRecords.map((vehicle, index) => (
							<div key={index} className="table-rows">
								<div className="number-plate">
									{vehicle.vehicle_number_plate}
								</div>
								<div className="make">{vehicle.vehicle_make}</div>
								<div className="model">{vehicle.vehicle_model}</div>
								<div className="color">{vehicle.vehicle_color}</div>
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
								<input
									className="number-plate"
									ref={vehicle_numberplate_ref}
									defaultValue={currentRow.vehicle_number_plate}
								/>
								<input
									className="make"
									ref={vehicle_make_ref}
									defaultValue={currentRow.vehicle_make}
								/>
								<input
									className="model"
									ref={vehicle_model_ref}
									defaultValue={currentRow.vehicle_model}
								/>
								<input
									className="color"
									ref={vehicle_color_ref}
									defaultValue={currentRow.vehicle_color}
								/>
								<div className="operations">
									<p
										id="save"
										onClick={(e) => {
											saveEditHandler(e)
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
		margin: 4% 0 0% 0%;
		display: flex;
		align-items: center;
		padding: 5px 0;
		width: 40%;
	}
	.search-box {
		padding: 0 !important;
	}

	.table-container {
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
	.number-plate,
	.make,
	.model,
	.color,
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

	}

	.table-rows {
		.number-plate {
			width: 20%;
			display: flex;
			align-items: center !important;
			border-right: 1px solid lightgrey;
		}
		.make {
			width: 24%;
			border-right: 1px solid lightgrey;
			display: flex;
			align-items: center !important;
		}
		.model {
			width: 15%;
			border-right: 1px solid lightgrey;
			display: flex;
			align-items: center !important;
		}
		.color {
			width: 20%;
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
		.number-plate {
			width: 20%;
			display: flex;
			align-items: center !important;
			border-right: 1px solid lightgrey;
		}
		.make {
			width: 24%;
			border-right: 1px solid lightgrey;
			display: flex;
			align-items: center !important;
		}
		.model {
			width: 15%;
			border-right: 1px solid lightgrey;
			display: flex;
			align-items: center !important;
		}
		.color {
			width: 20%;
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
`
