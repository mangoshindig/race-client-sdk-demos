import { FC, useEffect, useState } from "react";
import {
	CallContainer
} from "../../../assets/index.styles";
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import { ACCOUNT_SID, FLEXCHAT_FLOW_SID } from "src/constants";
import ChatManager from "./ChatManager";
import { Flex, Spinner } from "@twilio-paste/core";

export const Chat: FC = () => {

	const [managerSetup, setManagerSetup] = useState<FlexWebChat.Manager | undefined>();
	const [webChatConfig, setWebChatConfig] = useState<any>();


	const setupManager = (config: any) => {
		FlexWebChat.Manager.create(config).then((manager) => setManagerSetup(manager));
		console.log(managerSetup);
	};

	const getConfig = async () => {
		// set response to the result of calling the async function
		const response = await fetch(
			`https://api.ciptex.com/race/${ACCOUNT_SID}/webchat/${FLEXCHAT_FLOW_SID}/config`
		);

		setWebChatConfig(await response.json());
		setupManager(webChatConfig);
	};


	useEffect(() => {
		getConfig();
	}, [managerSetup]);

	return (
		<CallContainer>
			{managerSetup ? <ChatManager manager={managerSetup} /> : <Flex vAlignContent="center" hAlignContent="center" height="100%"><Spinner size="sizeIcon80" decorative={false} title="Loading" /></Flex>}
		</CallContainer>
	);
};

export default Chat;