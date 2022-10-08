import styled from "styled-components"

import Sidebar from "./components/Sidebar"
import Chart from "./components/Chart"

function App() {
	return (
		<Container>
			<Sidebar />
			<Chart />
		</Container>
	)
}

export default App

const Container = styled.div`
	display: flex;
	
`
