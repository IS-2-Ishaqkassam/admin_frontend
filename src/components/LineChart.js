import React, { PureComponent } from "react"
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


const LineChartComponent = ({ data }) => {
	console.log("inside chart", data)
	return (
		// <ResponsiveContainer width="100%" height="100%">
		<LineChart
			width={1200}
			height={300}
			data={data}
			margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="time" tickCount={17} minTickGap={-70} />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line
				type="monotone"
				dataKey="value"
				stroke="#8884d8"
				activeDot={{ r: 8 }}
			/>
			{/* <Line type="monotone" dataKey="value" stroke="#82ca9d" /> */}
		</LineChart>

		// </ResponsiveContainer>
	)
}
export default LineChartComponent
