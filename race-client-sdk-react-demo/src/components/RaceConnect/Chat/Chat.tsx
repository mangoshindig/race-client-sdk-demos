import { FC } from "react";
import {
	CallContainer
} from "../../../assets/index.styles";
import ChatManager from "./ChatManagerTwilio";
import { Flex, Spinner } from "@twilio-paste/core";
import { useFlexChatReactContext } from "src/hooks/FlexChatProviderReactContext";

export const Chat: FC = () => {

	// Passing the manager to the ChatManager component in order to load the chat.
	const { managerSetup } = useFlexChatReactContext();

	return (
		<CallContainer>
			{managerSetup ? <ChatManager manager={managerSetup} /> : <Flex vAlignContent="center" hAlignContent="center" height="100%"><Spinner size="sizeIcon80" decorative={false} title="Loading" /></Flex>}
		</CallContainer>
	);
};

export default Chat;