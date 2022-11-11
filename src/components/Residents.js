import React, { useState, useEffect, useRef } from "react"

import styled from "styled-components"

import TextField from "@mui/material/TextField"

function Residents() {
	const [vehicleCount, setVehicleCount] = useState(1)
	const vehicleDetails = []

	const vehiclemake = useRef("")
	const vehicleNumberplate = useRef("")
	const vehicleColor = useRef("")
	const vehicleModel = useRef(null)

	const addVehicle = (e) => {
		e.preventDefault()
		setVehicleCount(vehicleCount + 1)
		console.log(vehicleCount)
	}

	const removeVehicle = (e) => {
		e.preventDefault()
		setVehicleCount(vehicleCount - 1)
		console.log(vehicleCount)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(vehicleColor.current.value)
	}

	return (
		<Container>
			<Header>
				<p>Welcome, John Doe {vehicleCount}</p>
			</Header>

			<ResidentForm>
				<form>
					<Form>
						{/* <ResidentInputs>
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
						</ResidentInputs> */}

						<VehicleInputs>
							<div className="details_header">
								<p>Vehicle Details</p>
								<div>
									<button className="button" id="add" onClick={addVehicle}>
										Add Vehicle
									</button>
									{vehicleCount > 1 && (
										<button
											className="button"
											id="remove"
											onClick={removeVehicle}
										>
											remove
										</button>
									)}
								</div>
							</div>
							{Array.from(Array(vehicleCount)).map((vehicle, index) => {
								return (
									<div className="vehicles" key={index}>
										{index + 1}
										<div className="text-boxes">
											<TextField
												className="input"
												id="outlined-basic"
												label="Number Plate"
												variant="outlined"
												ref={vehicleNumberplate}
											/>
											<TextField
												className="input"
												id="outlined-basic"
												label="Vehicle Make"
												variant="outlined"
												ref={vehiclemake}
											/>
											<TextField
												className="input"
												id="outlined-basic"
												label="Vehicle Model"
												variant="outlined"
												ref={vehicleModel}
											/>
											<TextField
												className="input"
												id="outlined-basic"
												label="Vehicle Color"
												variant="outlined"
												ref={vehicleColor}
											/>
										</div>
									</div>
								)
							})}
						</VehicleInputs>
					</Form>
					<div className="submit">
						<button id="submit" onClick={handleSubmit}>
							Submit
						</button>
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
	overflow-y: scroll;

	p {
		font-size: 30px;
		margin: 1% 0;
	}

	form {
		.submit {
			display: flex;
			justify-content: center;
			margin-top: 20px;

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
			height: 80px;
			margin-bottom: 2%;
			align-items: center;
			justify-content: space-between;
			p {
				margin: 1% 0 1% 4%;
				padding: 5px 0 3px 5px;
			}

			div {
				display: flex;
				margin: 1% 12% 1% 0;
				width: 35%;
			}

			button {
				padding: 10px;
				font-size: 18px;

				:hover {
					cursor: pointer;
				}
			}

			#add {
				margin: 0 12% 0 0;
			}

			#remove {
				color: #801c25;
				outline-color: #801c25;
				border-color: #801c25;
			}
		}
	}
`
const ResidentInputs = styled.div`
	width: 50%;
	.input {
		outline: none;
		height: 25px;
		width: 43%;
		margin: 10px 0 6% 4%;
		font-size: 20px;
	}
`
const VehicleInputs = styled.div`
	width: 50%;
	height: 100%;
	.vehicles {
		display: flex;
		border-bottom: 1px dotted black;
	}

	.text-boxes {
		margin-top: 10px;
	}
	.input {
		outline: none;
		height: 25px;
		width: 40%;
		margin: 0 0 6% 4%;
		font-size: 20px;
	}
`
const Table = styled.div``
