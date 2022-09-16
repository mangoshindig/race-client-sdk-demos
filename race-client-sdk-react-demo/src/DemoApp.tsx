import { FC, useEffect } from "react";
import { Box } from "@twilio-paste/core/box";
import { VideoButton } from "./components/VideoButton/VideoButton";
import { useFlexChatContext } from "./hooks/useFlexChatContext";
import { useVideoContext } from "./hooks/useVideoContext";
import { VoiceButton } from "./components/VoiceButton/VoiceButton";
import { useVoiceContext } from "./hooks/useVoiceContext";
import { useFormContext } from "./hooks/useFormContext";
import { FormContainer } from "./components/Form/Form";
import { useSyncContext } from "./hooks/useSyncContext";

export const DemoApp: FC = () => {
	const { init: flexChatInit } = useFlexChatContext();
	const { init: videoInit } = useVideoContext();
	const { init: voiceInit } = useVoiceContext();
	const { init: formInit } = useFormContext();
	const { init: syncInit, status, isLoading } = useSyncContext();

	useEffect(() => {
		flexChatInit();
		voiceInit();
		videoInit();
		formInit();
		syncInit();
	}, []);

	return (
		<Box padding={"space100"}>
			{!isLoading && <Box>
				{(status === "ready") ? <span>Contact Centre is open</span> : <span>Contact Centre is currently closed</span>}
			</Box>}
			<Box display="flex" flex="1 1 auto" justifyContent="space-between" width="500px">
				<VideoButton />
				<VoiceButton />
			</Box>
			<Box padding="space200">
				<FormContainer />
			</Box>
		</Box>
	)
}