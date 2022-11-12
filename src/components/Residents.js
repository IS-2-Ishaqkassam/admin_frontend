import React, { useState, useEffect, useRef } from "react"

import styled from "styled-components"

import TextField from "@mui/material/TextField"
import CancelIcon from "@mui/icons-material/Cancel"

function Residents() {
	const [allVehicles, setAllVehicles] = useState([
		{
			number_plate: "",
			color: "",
			make: "",
			model: "",
		},
	])
	const [residentDetails, setResidentDetails] = useState([
		{
			name: "",
			email: "",
			house_number: "",
		},
	])

	const allDetails = {
		vehicles: [],
	}

	const addVehicle = (e) => {
		e.preventDefault()
		const values = [...allVehicles]
		values.push({
			number_plate: "",
			color: "",
			make: "",
			model: "",
		})
		setAllVehicles(values)
	}

	const removeVehicle = (index) => {
		const values = [...allVehicles]
		values.splice(index, 1)
		setAllVehicles(values)
	}

	const handleInputChange = (index, event) => {
		const values = [...allVehicles]
		const updatedValue = event.target.name
		values[index][updatedValue] = event.target.value
		setAllVehicles(values)
	}

	const handleResidentInputChange = (index, event) => {
		const values = [...residentDetails]
		const updatedValue = event.target.name
		values[index][updatedValue] = event.target.value
		setResidentDetails(values)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		allDetails["vehicles"] = allVehicles
		allDetails["name"] = residentDetails[0].name
		allDetails["email"] = residentDetails[0].email
		allDetails["house_number"] = residentDetails[0].house_number
		console.log("All Details", allDetails)
	}

	return (
		<Container>
			<Header>
				<p>Welcome, John Doe</p>
			</Header>

			<ResidentForm>
				<form onSubmit={handleSubmit}>
					<Form>
						<ResidentInputs>
							<div className="details_header">
								<p>Resident Details</p>
							</div>
							<div className="text-boxes">
								<TextField
									className="input"
									id="outlined-basic"
									label="Name"
									name="name"
									onChange={(e) => {
										handleResidentInputChange(0, e)
									}}
									variant="outlined"
								/>
								<TextField
									className="input"
									id="outlined-basic"
									label="Email"
									name="email"
									onChange={(e) => {
										handleResidentInputChange(0, e)
									}}
									variant="outlined"
								/>
								<TextField
									className="input"
									id="outlined-basic"
									name="house_number"
									label="House Number"
									variant="outlined"
									onChange={(e) => {
										handleResidentInputChange(0, e)
									}}
								/>
							</div>
						</ResidentInputs>

						<VehicleInputs>
							<div className="details_header">
								<p>Vehicle Details</p>
								<div>
									<button onClick={addVehicle}>Add Vehicle</button>
								</div>
							</div>
							{allVehicles.map((input, index) => {
								return (
									<div className="vehicles" key={index}>
										{index + 1}
										<div className="text-boxes" id="vehicle-text-boxes">
											<TextField
												className="input"
												id="outlined-basic"
												label="Number Plate"
												variant="outlined"
												value={input.number_plate}
												name="number_plate"
												onChange={(e) => {
													handleInputChange(index, e)
												}}
											/>
											<TextField
												className="input"
												id="outlined-basic"
												label="Vehicle Make"
												name="make"
												variant="outlined"
												value={input.make}
												onChange={(e) => {
													handleInputChange(index, e)
												}}
											/>
											<TextField
												className="input"
												id="outlined-basic"
												label="Vehicle Model"
												variant="outlined"
												name="model"
												value={input.model}
												onChange={(e) => {
													handleInputChange(index, e)
												}}
											/>
											<TextField
												className="input"
												id="outlined-basic"
												label="Vehicle Color"
												name="color"
												value={input.color}
												variant="outlined"
												onChange={(e) => {
													handleInputChange(index, e)
												}}
											/>
										</div>
										<div className="cancel-div">
											<CancelIcon
												className="cancel"
												onClick={() => {
													removeVehicle(index)
												}}
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

	.text-boxes {
		width: 90%;
	}

	.input {
		outline: none;
		height: 25px;
		width: 46%;
		margin: 10px 0 6% 4%;
		font-size: 20px;
	}
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
	width: 90%;
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
		}
	}
`
const ResidentInputs = styled.div`
	width: 50%;
`
const VehicleInputs = styled.div`
	width: 50%;

	.vehicles {
		display: flex;
		justify-content: space-between;
		align-items: center;

		#vehicle-text-boxes {
		}

		.cancel-div {
			margin-right: 10px;
			padding: 0;
			border-radius: 50%;

			:hover {
				cursor: pointer;
				color: red;
			}
		}
	}
`
const Table = styled.div``
