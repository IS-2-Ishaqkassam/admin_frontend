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
			setData(res.data.timeseries)
		})
	}, [])

	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(24)
	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

	const week = data ? data.slice(-169, -1) : []
	const currentRecords =
		week && week.slice(indexOfFirstRecord, indexOfLastRecord)

	const nPages = week && Math.ceil(week.length / recordsPerPage)
	return (
		<Parent>
			<LineChart width={900} height={300} data={currentRecords}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="timestamp" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="vehicle_count"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
			</LineChart>
			<Pagination
				className="pagination"
				nPages={nPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</Parent>
	)
}
export default AllObservationsLineChartComponent

const Parent = styled.div`
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
`
