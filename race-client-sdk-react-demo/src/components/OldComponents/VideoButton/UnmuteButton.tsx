import { Button } from "@twilio-paste/core/button";
import { MicrophoneOnIcon } from "@twilio-paste/icons/esm/MicrophoneOnIcon";
import { FC } from "react";
import { useVideoContext } from "../../../hooks/useVideoContext";

export const UnmuteButton: FC = () => {
	const { video } = useVideoContext();
	return (
		<Button onClick={() => video?.unmute()} variant="secondary">
			<MicrophoneOnIcon aria-label="Unmute Microphone" title="Unmute Microphone" decorative={false} />
		</Button>
	)
}