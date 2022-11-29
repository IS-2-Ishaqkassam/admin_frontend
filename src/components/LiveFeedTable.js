import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import Axios from "axios"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"

import Pagination from "./Pagination"

function LiveFeedTable() {
	const [searchText, setSearchText] = useState("")
	const [timeseries, setTimeseries] = useState()
	const getLiveFeed = async () => {
		const { data } = await Axios.get("http://localhost:4000/timeseries/read")
		setTimeseries(data)
	}

	useEffect(() => {
		getLiveFeed()
	}, [])

	const searchHandler = (e) => {}

	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(10)
	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
	const currentRecords =
		timeseries && timeseries.slice(indexOfFirstRecord, indexOfLastRecord)
	const nPages = timeseries && Math.ceil(timeseries.length / recordsPerPage)

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
					<p className="time">Time</p>
					<p className="number-plate">Number Plate</p>
				</div>

				<div className="row-container">
					{currentRecords &&
						currentRecords.map((vehicle, index) => (
							<div key={index} className="table-rows">
								<div className="time">{vehicle.timestamp}</div>
								<div className="number-plate">{vehicle.number_plate}</div>
							</div>
						))}
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

export default LiveFeedTable

const Table = styled.div`
	width: 85%;
	margin: 30px 0;
	.search {
		margin: 0% 0 1% 0%;
		display: flex;
		align-items: center;
		padding: 0px 0;
		width: 40%;
	}
	.search-box {
		padding: 0 !important;
	}

	.table-container {
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
	.time {
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
			width: 50%;
			display: flex;
			align-items: center !important;
			border-right: 1px solid lightgrey;
		}
		.time {
			width: 50%;
			border-right: 1px solid lightgrey;
			display: flex;
			align-items: center !important;
		}
	}

	.table-headers {
		.number-plate {
			width: 50%;
			display: flex;
			align-items: center !important;
			border-right: 1px solid lightgrey;
		}
		.time {
			width: 50%;
			border-right: 1px solid lightgrey;
			display: flex;
			align-items: center !important;
		}
	}
`
