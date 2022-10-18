import { Context, createContext, FC, useEffect, useState } from "react";
import { ReactElementProps } from "../../interface";
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import { useConfigContext } from "src/hooks/useConfigContext";

export type FlexChatProviderReactType = {
	managerSetup: FlexWebChat.Manager | undefined;
};

export const FlexChatProviderReactContext: Context<FlexChatProviderReactType> = createContext<FlexChatProviderReactType>(null!);

export const FlexChatProviderReact: FC<ReactElementProps> = ({ children }: ReactElementProps) => {

	const [managerSetup, setManagerSetup] = useState<FlexWebChat.Manager | undefined>();

	// Grabbing the web chat config from the ConfigProvider, this config is coming from our AWS account and is responsible for the look and feel of the webchat.
	const { webChatConfig } = useConfigContext();

	// This function is responsible for setting up the Twilio Flex Web Chat by using the config above.
	useEffect(() => {
		if (webChatConfig) {
			FlexWebChat.Manager.create(webChatConfig).then((manager) => setManagerSetup(manager));
			console.log(managerSetup + " manager setup");
		}
	}, [managerSetup, webChatConfig]);


	return (<FlexChatProviderReactContext.Provider value={{ managerSetup }}>{children}</FlexChatProviderReactContext.Provider>);
};
