import { Button } from "@twilio-paste/core/button";
import { MicrophoneOnIcon } from "@twilio-paste/icons/esm/MicrophoneOnIcon";
import { FC } from "react";
import { useVoiceContext } from "../../../hooks/useVoiceContext";

export const UnmuteButton: FC = () => {
	const { voice } = useVoiceContext();
	return (
		<Button onClick={() => voice?.call?.mute(false)} variant="secondary">
			<MicrophoneOnIcon aria-label="Unmute Microphone" title="Unmute Microphone" decorative={false} />
		</Button>
	)
}