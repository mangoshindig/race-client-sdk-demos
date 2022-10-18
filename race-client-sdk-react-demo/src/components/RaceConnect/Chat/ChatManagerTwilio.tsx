import { useEffect } from "react";
import {
	FlexWebChatContainer
} from "../../../assets/index.styles";
import * as FlexWebChat from "@twilio/flex-webchat-ui";

export type FlexWebChatContainerProps = {
  manager: FlexWebChat.Manager;
};

export const ChatManagerTwilio = ({ manager }: FlexWebChatContainerProps) => {

	useEffect(() => {
		const button = document.querySelector<HTMLButtonElement>(".Twilio.Twilio-EntryPoint");
		if (button) {
			button.style.display = "none";
			button.click();
		}
	}, [manager]);

	useEffect(() => {
		const header = document.querySelector<HTMLButtonElement>(".Twilio.Twilio-MainHeader");
		if (header) {
			header.style.display = "none";
		}
	}, [manager]);

	useEffect(() => {
		const container = document.querySelector<HTMLButtonElement>(".Twilio.Twilio-MainContainer");
		if (container) {
			container.style.boxShadow = "none";
			container.style.width = "100%";
		}
	}, [manager]);

	return (
		<FlexWebChatContainer>
			<FlexWebChat.ContextProvider manager={manager}>
				<FlexWebChat.MainContainer />
			</FlexWebChat.ContextProvider>
		</FlexWebChatContainer>
	);
};

export default ChatManagerTwilio;