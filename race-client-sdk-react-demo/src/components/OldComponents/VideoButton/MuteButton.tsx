import { Button } from "@twilio-paste/core/button";
import { MicrophoneOffIcon } from "@twilio-paste/icons/esm/MicrophoneOffIcon";
import { FC } from "react";
import { useVideoContext } from "../../../hooks/useVideoContext";

export const MuteButton: FC = () => {
	const { video } = useVideoContext();
	return (
		<Button onClick={() => video?.mute()} variant="secondary">
			<MicrophoneOffIcon aria-label="Mute Microphone" title="Mute Microphone" decorative={false} />
		</Button>
	)
}