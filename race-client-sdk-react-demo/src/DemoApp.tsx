import { FC } from "react";
import { Box } from "@twilio-paste/core/box";

import { RaceConnect } from "./components/RaceConnect/WidgetLoader";


export const DemoApp: FC = () => {



	return (
		<Box>
			<RaceConnect conf = {{showQ1 : false,
		otherServices : [
			{key : "First Time Home Buyer", value : "First Time Homebuyer"},
			{key : "Small Business Owner", value : "Small Business Owner"},
			{key : "Foreclosure Prevention", value : "Foreclosure Prevention"},
			{key : "Reverse Mortgage Help", value : "Reverse Mortgage"},
			{key : "Bankruptcy Guidance", value : "Bankruptcy"},
			{key : "Overall Financial Review", value : "Overall Budget and Financial Review"}
		]}} />
		</Box>
	)
}