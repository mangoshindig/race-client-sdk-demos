import { Button } from "@twilio-paste/core/button";
import { FC, useEffect } from "react";
import { useVoiceContext } from "../../../hooks/useVoiceContext";
import { UnmuteButton } from "./UnmuteCallButton";
import { MuteButton } from "./MuteCallButton";
import Icon from "src/assets/icons";
import { WebCallContainer } from "src/assets/index.styles";

export const CallButton: FC = () => {
	const { connect, voice, disconnect, status, isMuted } = useVoiceContext();

	useEffect(() => {
		console.log(status)
	}, [status]);

	return (
		<>
			<Button onClick={() => connect()} variant="secondary" loading={!voice?.ready}><Icon icon="call" />Click To Call</Button>
			{status !== "closed" ?
				<WebCallContainer>
					{isMuted ? <UnmuteButton /> : <MuteButton />}
					<Button onClick={() => disconnect()} variant="destructive">Hangup</Button>
				</WebCallContainer>
				: null}
		</>
	);
}