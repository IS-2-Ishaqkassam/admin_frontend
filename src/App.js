import styled from "styled-components"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Chart from "./components/Chart"
import Residents from "./components/Residents"
import WeeklyTable from "./components/WeeklyTable"

function App() {
	return (
		<Container>
			<BrowserRouter>
				<Sidebar />
				<Routes>
					<Route path="/" element={<Chart />} />
					<Route path="/residents" element={<Residents />} />
					<Route path="/weekly" element={<WeeklyTable />} />
				</Routes>
			</BrowserRouter>
		</Container>
	)
}

export default App

const Container = styled.div`
	display: flex;
`
