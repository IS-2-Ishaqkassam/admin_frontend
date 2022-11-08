import React from "react"
import styled from "styled-components"

import TextField from "@mui/material/TextField"

function Residents() {
	return (
		<Container>
			<Header>
				<p>Welcome, John Doe</p>
			</Header>

			{/* <CreateUser>
				<button>Create User</button>
			</CreateUser> */}

			<ResidentForm>
				<form>
					<Form>
						<ResidentInputs>
							<div className="details_header">
								<p>Resident Details</p>
							</div>
							<TextField
								className="input"
								id="outlined-basic"
								label="Name"
								variant="outlined"
							/>
							<TextField
								className="input"
								id="outlined-basic"
								label="Email"
								variant="outlined"
							/>
							<TextField
								className="input"
								id="outlined-basic"
								label="House Number"
								variant="outlined"
							/>
						</ResidentInputs>

						<VehicleInputs>
							<div className="details_header">
								<p>Vehicle Details</p>
								<button>Add Vehicle</button>
							</div>
							<TextField
								className="input"
								id="outlined-basic"
								label="Number Plate"
								variant="outlined"
							/>
							<TextField
								className="input"
								id="outlined-basic"
								label="Vehicle Make"
								variant="outlined"
							/>
							<TextField
								className="input"
								id="outlined-basic"
								label="Vehicle Model"
								variant="outlined"
							/>
							{/* <TextField
								className="input"
								id="outlined-basic"
								label="Vehicle Color"
								variant="outlined"
							/> */}
						</VehicleInputs>
					</Form>
					<div class="submit">
						<button id="submit">Submit</button>
					</div>
				</form>
			</ResidentForm>

			<Table></Table>
		</Container>
	)
}

export default Residents

const Container = styled.div`
	width: 87%;
`
const Form = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`
const Header = styled.div`
	height: 10%;
	width: 100%;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	display: flex;
	align-items: center;

	p {
		margin-left: 3%;
		font-size: 28px;
	}
`

const ResidentForm = styled.div`
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	width: 85%;
	margin: 2% 0 0 5%;
	padding: 1% 0 1% 0%;

	p {
		font-size: 30px;
		margin: 1% 0;
	}

	form {
		.submit {
			display: flex;
			justify-content: center;
			margin-top: 2%;

			#submit {
				padding: 10px;
				height: 90%;
				font-size: large;

				:hover {
					cursor: pointer;
				}
			}
		}

		.details_header {
			display: flex;
			height: 30%;
			margin-bottom: 2%;
			/* border: 1px solid black; */
			align-items: center;
			p {
				margin: 1% 10% 1% 4%;
				padding: 5px 0 3px 5px;
			}
			button {
				margin-left: 35%;
				padding: 10px;
				font-size: large;

				:hover {
					cursor: pointer;
				}
			}
		}
	}
`
const ResidentInputs = styled.div`
	width: 50%;
	/* border: 1px solid red; */

	.input {
		outline: none;
		height: 25px;
		width: 43%;
		margin: 0 0 6% 4%;
		font-size: 20px;
	}
`
const VehicleInputs = styled.div`
	width: 50%;
	/* border: 1px solid black; */

	.input {
		outline: none;
		height: 25px;
		width: 43%;
		margin: 0 0 6% 4%;
		font-size: 20px;
	}
`
const Table = styled.div``
