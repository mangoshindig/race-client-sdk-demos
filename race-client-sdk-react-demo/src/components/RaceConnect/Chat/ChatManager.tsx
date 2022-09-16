import { useEffect } from "react";
import {
	FlexWebChatContainer
} from "../../../assets/index.styles";
import * as FlexWebChat from "@twilio/flex-webchat-ui";

export type FlexWebChatContainerProps = {
  manager: FlexWebChat.Manager;
};

export const ChatManager = ({ manager }: FlexWebChatContainerProps) => {

	useEffect(() => {
		const button = document.querySelector<HTMLButtonElement>(".Twilio.Twilio-EntryPoint");
		if (button) {
			button.style.display = "none";
			button.click();
		}
	}, []);


	return (
		<FlexWebChatContainer>
			<FlexWebChat.ContextProvider manager={manager}>
				<FlexWebChat.RootContainer />
			</FlexWebChat.ContextProvider>
		</FlexWebChatContainer>
	);
};

export default ChatManager;