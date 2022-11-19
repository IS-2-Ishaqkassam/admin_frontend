import React, { PureComponent, useEffect, useState } from "react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"

import styled from "styled-components"
import Axios from "axios"
import Pagination from "./Pagination"

const AllObservationsLineChartComponent = () => {
	const [data, setData] = useState()
	useEffect(() => {
		Axios.get("http://localhost:4000/timeseries/datefakeData").then((res) => {
			console.log("fake data chart: ", res.data.timeseries)
			setData(res.data.timeseries)
		})
	}, [])

	console.log("inside chart", data)

	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(24)
	// if (formattedForecast) {
	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

	const week = data ? data.slice(-168, -1) : []
	console.log("week", week)
	const currentRecords =
		week && week.slice(indexOfFirstRecord, indexOfLastRecord)

	const nPages = week && Math.ceil(week.length / recordsPerPage)
	return (
		// <ResponsiveContainer width="100%" height="100%">
		<Parent>
			<LineChart
				width={1600}
				height={300}
				data={currentRecords}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="timestamp" tickCount={17} minTickGap={-70} />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="count"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
				{/* <Line type="monotone" dataKey="value" stroke="#82ca9d" /> */}
			</LineChart>
			<Pagination
				className="pagination"
				nPages={nPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</Parent>

		// </ResponsiveContainer>
	)
}
export default AllObservationsLineChartComponent

const Parent = styled.div`
	.pagination {
		/* width: 10%; */
		overflow-x: hidden;
	}
`
