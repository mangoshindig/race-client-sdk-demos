import { FC, useEffect } from "react";
import { Box } from "@twilio-paste/core/box";

import { RaceConnect } from "./components/RaceConnect/WidgetLoader";


export const DemoApp: FC = () => {



	return (
		<Box>
			{/*<IframeLoader />*/}
			<RaceConnect />
		</Box>
	)
}