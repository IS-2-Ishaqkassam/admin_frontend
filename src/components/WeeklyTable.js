import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import Axios from "axios"

import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"
import Pagination from "./Pagination"
import LineChartComponent from "./LineChartTemplate"

function WeeklyTable() {
	const [searchText, setSearchText] = useState("")
	const [day, setDay] = useState("")

	const [allData, setAllData] = useState()

	useEffect(() => {
		Axios.get("http://localhost:4000/timeseries/fakeData").then((res) => {
			console.log("res", res.data.timeseries)
			setAllData(res.data.timeseries)
		})
	}, [])

	const handleChange = (event) => {
		setDay(event.target.value)
	}

	const searchHandler = (e) => {}

	const data = allData ? allData.slice(-672, -1) : []
	//data in days
	const Monday = []
	const Tuesday = []
	const Wednesday = []
	const Thursday = []
	const Friday = []
	const Saturday = []
	const Sunday = []
	for (let i = 0; i < data.length; i++) {
		if (data[i].dayOfWeek == 0) {
			Sunday.push(data[i].data)
		} else if (data[i].dayOfWeek == 1) {
			Monday.push(data[i].data)
		} else if (data[i].dayOfWeek == 2) {
			Tuesday.push(data[i].data)
		} else if (data[i].dayOfWeek == 3) {
			Wednesday.push(data[i].data)
		} else if (data[i].dayOfWeek == 4) {
			Thursday.push(data[i].data)
		} else if (data[i].dayOfWeek == 5) {
			Friday.push(data[i].data)
		} else if (data[i].dayOfWeek == 6) {
			Saturday.push(data[i].data)
		}
	}
	console.log("Monday", Monday)
	console.log("Tue", Tuesday)
	console.log("Wed", Wednesday)
	console.log("Thur", Thursday)
	console.log("Fri", Friday)
	console.log("Sat", Saturday)
	console.log("Sun", Sunday)

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
			<FormControl className="dropdown">
				<InputLabel id="demo-simple-select-label">Day</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={day}
					label="Day"
					onChange={handleChange}
				>
					<MenuItem value={"Sunday"}>Sunday</MenuItem>
					<MenuItem value={"Monday"}>Monday</MenuItem>
					<MenuItem value={"Tuesday"}>Tuesday</MenuItem>
					<MenuItem value={"Wednesday"}>Wednesday</MenuItem>
					<MenuItem value={"Thursday"}>Thursday</MenuItem>
					<MenuItem value={"Friday"}>Friday</MenuItem>
					<MenuItem value={"Saturday"}>Saturday</MenuItem>
				</Select>
			</FormControl>

			{day === "Sunday" ? (
				<LineChartComponent data={Sunday} />
			) : day === "Monday" ? (
				<LineChartComponent data={Monday} />
			) : day === "Tuesday" ? (
				<LineChartComponent data={Tuesday} />
			) : day === "Wednesday" ? (
				<LineChartComponent data={Wednesday} />
			) : day == "Thursday" ? (
				<LineChartComponent data={Thursday} />
			) : day === "Friday" ? (
				<LineChartComponent data={Friday} />
			) : day === "Saturday" ? (
				<LineChartComponent data={Saturday} />
			) : (
				<LineChartComponent data={Sunday} />
			)}
		</Table>
	)
}

export default WeeklyTable

const Table = styled.div`
	width: 45%;

	.dropdown {
		width: 25%;
		margin: 20px 0;
	}

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
		/* height: 270px; */
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
	}

	.table-rows {
		.tr {
			width: 30%;
			display: flex;
			/* justify-content: space-around; */
			align-items: center !important;
			border-right: 1px solid lightgrey;
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
		.th {
			width: 30%;
			display: flex;
			justify-content: space-around;
			align-items: center !important;
			border-right: 1px solid lightgrey;
		}
	}
`
