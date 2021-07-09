import house1 from "../common/img/house/h1.svg";
import house2 from "../common/img/house/h2.svg";
import house3 from "../common/img/house/h3.svg";
import house4 from "../common/img/house/h4.svg";
import house5 from "../common/img/house/h5.svg";
import house6 from "../common/img/house/h6.svg";
import house7 from "../common/img/house/h7.svg";

const houseData = [
	{
		id: 1,
		detail: {
			rent: "year",
			thumb: house1,
			amenities: "Furnished",
			bedroom: 3,
			bathroom: 2,
			price: 9000000,
			area: "1,800",
			location: "Jakarta Utara",
		},
	},
	{
		id: 2,
		detail: {
			rent: "year",
			thumb: house2,
			amenities: "Furnished",
			bedroom: 1,
			bathroom: 1,
			price: 3000000,
			area: "800",
			location: "Jakarta Timur",
		},
	},
	{
		id: 3,
		detail: {
			rent: "year",
			thumb: house3,
			amenities: "Furnished",
			bedroom: 3,
			bathroom: 2,
			price: 8000000,
			area: "2,100",
			location: "Jakarta Timur",
		},
	},
	{
		id: 4,
		detail: {
			rent: "month",
			thumb: house4,
			amenities: "Shared Accomodation",
			bedroom: 4,
			bathroom: 3,
			price: 13000000,
			area: "2,200",
			location: "Jakarta Utara",
		},
	},
	{
		id: 5,
		detail: {
			rent: "month",
			thumb: house5,
			amenities: "Shared Accomodation",
			bedroom: 2,
			bathroom: 2,
			price: 5500000,
			area: "1,900",
			location: "Jakarta Barat",
		},
	},
	{
		id: 5,
		detail: {
			rent: "month",
			thumb: house5,
			amenities: "Pet Allowed",
			bedroom: 3,
			bathroom: 2,
			price: 3000000,
			area: "1,800",
			location: "Jakarta Selatan",
		},
	},
	{
		id: 6,
		detail: {
			rent: "month",
			thumb: house6,
			amenities: "Pet Allowed",
			bedroom: 1,
			bathroom: 1,
			price: 3500000,
			area: "810",
			location: "Jakarta Selatan",
		},
	},
	{
		id: 7,
		detail: {
			rent: "day",
			thumb: house7,
			amenities: "Shared Accomodation",
			bedroom: 2,
			bathroom: 1,
			price: 5000000,
			area: "1,200",
			location: "Jakarta Timur",
		},
	},
];

export default houseData;
