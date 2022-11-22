import React, { useState, useEffect } from "react"
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
import Axios from "axios"
import styled from "styled-components"
import Pagination from "./Pagination"

const LineChartComponent = () => {
	const [data, setData] = useState()
	useEffect(() => {
		Axios.get("http://localhost:4000/forecast/1668155715965:HJ3HYYsSo").then(
			(res) => {
				setData(res.data)
			}
		)
	}, [])

	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(24)
	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

	const currentRecords =
		data && data.slice(indexOfFirstRecord, indexOfLastRecord)

	const nPages = data && Math.ceil(data.length / recordsPerPage)

	return (
		<Parent>
			<LineChart width={700} height={300} data={currentRecords}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="time" />
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
				nPages={nPages}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</Parent>

	)
}
export default LineChartComponent

const Parent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
