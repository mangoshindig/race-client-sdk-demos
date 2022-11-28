import { FC, useEffect } from "react";
import { Box } from "@twilio-paste/core/box";
import { useVideoContext } from "./hooks/useVideoContext";
import { useVoiceContext } from "./hooks/useVoiceContext";
import { useFormContext } from "./hooks/useFormContext";
import { RaceConnect } from "./components/RaceConnect/WidgetLoader";
import { IframeLoader } from "./components/IframeLoader/IframeLoader";

export const DemoApp: FC = () => {
	const { init: videoInit } = useVideoContext();
	const { init: voiceInit } = useVoiceContext();
	const { init: formInit } = useFormContext();

	useEffect(() => {
		voiceInit();
		videoInit();
		formInit();
	}, []);

	return (
		<Box>
			<IframeLoader />
			<RaceConnect />
		</Box>
	)
}