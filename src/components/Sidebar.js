import styled from "styled-components"
import { Link } from "react-router-dom"

import React from "react"

function Sidebar() {
	// 1C4E80
	return (
		<Container>
			<Logo>
				<image src="" alt="logo" />
			</Logo>

			<Nav>
				<ul>
					<Link to="/">
						<li>
							<p>Forecast</p>
						</li>
					</Link>
					<Link to="/residents">
						<li>
							<p>Resident Details</p>
						</li>
					</Link>
				</ul>

				<div>
					<p>Logout</p>
				</div>
			</Nav>
		</Container>
	)
}

export default Sidebar

const Container = styled.div`
	background-color: #1c4e80;
	width: 13%;
	height: 100vh;
	margin: 0;
	padding: 0;
`
const Logo = styled.div`
	background-color: green;
	height: 30vh;

	img {
		background-color: white;
		border-radius: 50%;
	}
`
const Nav = styled.div`
	/* border: 1px solid black; */
	height: 70vh;

	ul {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid white;
	}
	li {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 67px;
		border-top: 1px solid white;
		/* border-left: 1px solid white;
		border-right: 1px solid white; */
		font-size: 28px;
		color: white;

		:hover {
			cursor: pointer;
			background-color: grey;
		}
	}

	div {
		margin: auto;
		margin-top: 117px;
		height: 62px;
		/* width: 167px; */
		width: 60%;
		border-radius: 10px;
		background-color: #801c25;
		font-size: 2em;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;

		:hover {
			background-color: darkred;
			cursor: pointer;
		}
	}
`
