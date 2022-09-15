import { Button } from "@twilio-paste/core/button";
import { FC } from "react";
import { useVoiceContext } from "../../../hooks/useVoiceContext";
import { UnmuteButton } from "./UnmuteCallButton";
import { MuteButton } from "./MuteCallButton";
import Icon from "src/assets/icons";
import { WebCallContainer } from "src/assets/index.styles";

export const CallButton: FC = () => {
	const { connect, voice, disconnect, status, isMuted } = useVoiceContext();

	return (
		// <PopoverContainer baseId="voice-controls">
		// 	<PopoverButton onClick={() => connect()} variant="primary" loading={!voice?.ready}><ProductVoiceIcon decorative={true} />
		// 			Start Voice Call
		// 	</PopoverButton>
		// 	<Popover aria-label="Popover">
		// 		{status !== "closed" ? <Box width="150px" padding="space40">
		// 			<Box display="flex" position="relative" flexDirection="row" flex="1 1 auto" justifyContent="space-between">
		// 				{isMuted ? <UnmuteButton /> : <MuteButton />}
		// 				<Button onClick={() => disconnect()} variant="destructive">Hangup</Button>
		// 			</Box>
		// 		</Box> :
		// 			<Box>No Active Call</Box>}
		// 	</Popover>
		// </PopoverContainer>
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