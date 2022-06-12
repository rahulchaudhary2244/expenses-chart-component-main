const givenData = [
	{
		day: "mon",
		amount: 17.45,
	},
	{
		day: "tue",
		amount: 34.91,
	},
	{
		day: "wed",
		amount: 52.36,
	},
	{
		day: "thu",
		amount: 31.07,
	},
	{
		day: "fri",
		amount: 23.39,
	},
	{
		day: "sat",
		amount: 43.28,
	},
	{
		day: "sun",
		amount: 25.48,
	},
];

const prepareDataByMutating = (data) => {
	let maxAmount = data[0].amount;
	for (let idx = 0; idx < data.length; idx++) {
		const element = data[idx];
		element.id = idx + 1;
		element.backgroundColor = "#f37e79b8";
		if (element.amount >= maxAmount) maxAmount = element.amount;
	}
	//changing bar-color for day which have maximum amount
	data.forEach((x) => {
		if (x.amount === maxAmount) x.backgroundColor = "#7bd1db";
	});
};

const getData = (data) => {
	return {
		labels: getLabels(data),
		datasets: [
			{
				data: getGraphReadings(data),
				backgroundColor: getBackgroundColors(data),
				borderRadius: 4,
				borderSkipped: false,
			},
		],
	};
};

const getConfig = (data) => {
	return {
		type: "bar",
		data: getData(data),
		options: {
			scales: {
				y: {
					beginAtZero: true,
					grid: {
						display: false,
						borderWidth: 0,
					},
					ticks: {
						display: false,
					},
				},
				x: {
					grid: {
						display: false,
						borderWidth: 0,
					},
					ticks: {
						color: "gray",
					},
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				tooltip: {
					displayColors: false,
					xAlign: "center",
					yAlign: "bottom",
					caretSize: 0,
					backgroundColor: "#481420ed",
					callbacks: {
						title: () => "",
						label: (context) => {
							let label = context.dataset.label || "";
							if (context.parsed.y !== null) {
								label += new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(context.parsed.y);
							}
							return label;
						},
					},
				},
			},
			onHover: (event, chartElement) => {
				event.native.target.style.cursor = chartElement[0]
					? "pointer"
					: "default";
			},
		},
	};
};

//------------utility functions----------
const getLabels = (data) => data.map((x) => x.day);
const getGraphReadings = (data) => data.map((x) => x.amount);
const getBackgroundColors = (data) => data.map((x) => x.backgroundColor);
//---------------------------------------

prepareDataByMutating(givenData);

const expenseGraph = new Chart(
	document.getElementById("expense-graph"),
	getConfig(givenData)
);
