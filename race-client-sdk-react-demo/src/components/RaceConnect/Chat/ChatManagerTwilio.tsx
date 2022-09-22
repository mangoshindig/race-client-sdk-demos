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
			if (button.style.display === "none") {
				button.click();
				button.click();
			} else {
				button.style.display === "none";
				button.click();
				button.click();
			}
		}
	}, [manager]);


	return (
		<FlexWebChatContainer>
			<FlexWebChat.ContextProvider manager={manager}>
				<FlexWebChat.RootContainer />
			</FlexWebChat.ContextProvider>
		</FlexWebChatContainer>
	);
};

export default ChatManagerTwilio;