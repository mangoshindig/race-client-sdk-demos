import { FC, useEffect, useState } from "react";
import {
	CallContainer
} from "../../../assets/index.styles";
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import ChatManager from "./ChatManagerTwilio";
import { Flex, Spinner } from "@twilio-paste/core";
import { useConfigContext } from "src/hooks/useConfigContext";

export const Chat: FC = () => {

	const { webChatConfig } = useConfigContext();
	const [managerSetup, setManagerSetup] = useState<FlexWebChat.Manager | undefined>();

	useEffect(() => {
		if (managerSetup === undefined) {
			FlexWebChat.Manager.create(webChatConfig).then((manager) => setManagerSetup(manager));
			console.log(managerSetup + " manager setup");
		}
	}, [managerSetup, webChatConfig]);

	return (
		<CallContainer>
			{managerSetup ? <ChatManager manager={managerSetup} /> : <Flex vAlignContent="center" hAlignContent="center" height="100%"><Spinner size="sizeIcon80" decorative={false} title="Loading" /></Flex>}
		</CallContainer>
	);
};

export default Chat;