// import React, { PureComponent, useEffect, useState } from "react"
// import {
// 	LineChart,
// 	Line,
// 	XAxis,
// 	YAxis,
// 	CartesianGrid,
// 	Tooltip,
// 	Legend,
// 	ResponsiveContainer,
// } from "recharts"

// import styled from "styled-components"
// import Axios from "axios"
// import Pagination from "./Pagination"

// const AllObservationsLineChartComponent = () => {
// 	const [data, setData] = useState()
// 	useEffect(() => {
// 		Axios.get("http://localhost:4000/timeseries/datefakeData").then((res) => {
// 			setData(res.data.timeseries)
// 			console.log("dated fake data", res.data.timeseries)
// 		})
// 	}, [])

// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [recordsPerPage] = useState(24)
// 	const indexOfLastRecord = currentPage * recordsPerPage
// 	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

// 	const week = data ? data.slice(-169, -1) : []
// 	const currentRecords =
// 		week && week.slice(indexOfFirstRecord, indexOfLastRecord)

// 	const nPages = week && Math.ceil(week.length / recordsPerPage)
// 	return (
// 		<Parent>
// 			<h4>All Observations</h4>
// 			<LineChart
// 				className="chart"
// 				width={700}
// 				height={300}
// 				data={currentRecords}
// 			>
// 				<CartesianGrid strokeDasharray="3 3" />
// 				<XAxis dataKey="timestamp" />
// 				<YAxis />
// 				<Tooltip />
// 				<Legend />
// 				<Line
// 					type="monotone"
// 					dataKey="vehicle_count"
// 					stroke="#8884d8"
// 					activeDot={{ r: 8 }}
// 				/>
// 			</LineChart>
// 			<Pagination
// 				className="pagination"
// 				nPages={nPages}
// 				currentPage={currentPage}
// 				setCurrentPage={setCurrentPage}
// 			/>
// 		</Parent>
// 	)
// }
// export default AllObservationsLineChartComponent

// const Parent = styled.div`
// 	width: 45%;
// 	/* border: 1px solid black; */
// 	/* margin: 10px 30px; */
// 	display: flex;
// 	flex-direction: column;
// 	/* align-items: center; */

// 	.chart {
// 		/* border: 1px solid red; */
// 		width: 60% !important;
// 	}

// 	.pagination {
// 		/* border: 1px solid black; */
// 	}
// `
