// // Load package
// const ctsa = require("ctsa")

// const predict = (ts) => {
// 	const diff = ctsa.diff(ts, 1, 1) // lag, differences
// 	const acf = ctsa.acf(ts, 20, {
// 		method: 0, // ACF method Default
// 	})
// 	const pacf = ctsa.pacf(ts, 20, {
// 		method: 0, // PACF method Yule-Walker Default
// 	})
// 	const [pred, errors] = ctsa.arima(ts, 20, {
// 		method: 0, // ARIMA method (Default: 0)
// 		optimizer: 6, // Optimization method (Default: 6)
// 		p: 1, // Number of Autoregressive coefficients
// 		d: 0, // Number of times the series needs to be differenced
// 		q: 1, // Number of Moving Average Coefficients
// 		verbose: true, // Output model analysis to console
// 	})
// 	return pred
// }

// module.exports = predict
