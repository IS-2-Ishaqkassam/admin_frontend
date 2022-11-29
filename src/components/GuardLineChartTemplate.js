import React from "react"
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

const GuardLineChartTemplate = ({ data }) => {
	return (
		<Parent>
			<LineChart width={700} height={300} data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="hourOfDay" />
				<YAxis allowDecimals={false} allowDataOverflow={true} />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="Min Guards Required"
					stroke="#8884d8"
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</Parent>
	)
}
export default GuardLineChartTemplate

const Parent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
