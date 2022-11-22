import React, { useState } from "react"
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
import Pagination from "./Pagination"

const LineChartComponent = ({ data }) => {
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
				<XAxis dataKey="hourOfDay" />
				<XAxis
					xAxisId="2"
					dataKey="date_month"
					allowDuplicatedCategory={false}
				/>
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="count"
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
