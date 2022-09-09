import { FC, useEffect } from "react";
import { Box } from "@twilio-paste/core/box";
import { useVideoContext } from "./hooks/useVideoContext";
import { useVoiceContext } from "./hooks/useVoiceContext";
import { useFormContext } from "./hooks/useFormContext";
import { RaceConnect } from "./components/RaceConnect";

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
			{/* <Box display="flex" flex="1 1 auto" justifyContent="space-between" width="500px">
				<VideoButton />
				<VoiceButton />
			</Box>
			<Box padding="space200">
				<FormContainer />
			</Box> */}
			<Box>
				<RaceConnect />
			</Box>
		</Box>
	)
}