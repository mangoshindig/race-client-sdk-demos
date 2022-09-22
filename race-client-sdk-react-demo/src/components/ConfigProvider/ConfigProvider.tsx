import { Context, createContext, FC, useEffect, useState } from "react";
import { ACCOUNT_SID, FLEXCHAT_FLOW_SID, MOCKAPI } from "src/constants";
import { ReactElementProps } from "../../interface";

export type ConfigContextType = {
	config: any;
	webChatConfig: any;
};

export const ConfigContext: Context<ConfigContextType> = createContext<ConfigContextType>(null!);

export const ConfigProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {

	const [config, setConfig] = useState<any>("");
	const [webChatConfig, setWebChatConfig] = useState<any>("");

	useEffect(() => {
		fetch(`${MOCKAPI}`)
			.then((response) => response.json())
			.then((data) => {
				setConfig(data);
			}
			)
	}, []);

	useEffect(() => {
		fetch(`https://api.ciptex.com/race/${ACCOUNT_SID}/webchat/${FLEXCHAT_FLOW_SID}/config`)
			.then((response) => response.json())
			.then((data) => {
				setWebChatConfig(data);
			}
			)
	}, []);


	return (<ConfigContext.Provider value={{ config, webChatConfig }}>{children}</ConfigContext.Provider>);
};
