import { FC } from "react";
import { Box } from "@twilio-paste/core/box";

import { RaceConnect } from "./components/RaceConnect/WidgetLoader";


export const DemoApp: FC = () => {



	return (
		<Box>
			<RaceConnect conf = {{showQ1 : true,
		otherServices : [
			{value : "Student Loan Debt", spanishValue : "Préstamos de Estudiantes",  key : "Student Loan Help"},
			{value : "Small Business Owner", spanishValue : "Dueños de pequeños negocios",  key : "Small Business Owner"},
			{value : "Foreclosure Prevention", spanishValue : "Morosidad Hipotecaria",  key : "Foreclosure Prevention"},
			{value : "Reverse Mortgage Help", spanishValue : "Hipoteca Invertida",  key : "Reverse Mortgage"},
			{value : "Bankruptcy Guidance", spanishValue : "Quiebra",  key : "Bankruptcy"},
			{value : "Rental Counseling", spanishValue : "Ayuda de Alquiler",  key : "Rental Counseling"},
			{value : "First Time Homebuyer", spanishValue : "Primeros Compradores De Vivienda",  key : "First Time Homebuyer"}


		],
		useProd : true,
		language : "English"}} />
		</Box>
	)
}