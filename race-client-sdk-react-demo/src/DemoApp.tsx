import { FC, useEffect } from "react";
import { Box } from "@twilio-paste/core/box";
import { useVideoContext } from "./hooks/useVideoContext";
import { useVoiceContext } from "./hooks/useVoiceContext";
import { useFormContext } from "./hooks/useFormContext";
import { RaceConnect } from "./components/RaceConnect/WidgetLoader";

export const DemoApp: FC = () => {
	// const { init: flexChatInit } = useFlexChatContext();
	const { init: videoInit } = useVideoContext();
	const { init: voiceInit } = useVoiceContext();
	const { init: formInit } = useFormContext();

	useEffect(() => {
		// flexChatInit();
		voiceInit();
		videoInit();
		formInit();
	}, []);

	return (
		<Box padding={"space100"}>
			<RaceConnect />
		</Box>
	)
}