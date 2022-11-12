import styled from "styled-components"
import { Link } from "react-router-dom"
// import {logo} from './img/logo'

import React from "react"

function Sidebar() {
	return (
		<Container>
			<Logo>
				<img src="./img/logo.jpg" alt="logo" />
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
	background-color: #1c4e80;
	height: 30vh;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		background-color: white;
		border-radius: 50%;
		height: 70%;
		width: 80%;
	}
`
const Nav = styled.div`
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
