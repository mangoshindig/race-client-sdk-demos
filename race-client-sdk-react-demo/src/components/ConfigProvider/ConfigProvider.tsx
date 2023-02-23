import { Context, createContext, FC, useEffect, useState } from "react";
import { ACCOUNT_SID, FLEXCHAT_FLOW_SID, MOCKAPI } from "src/constants";
import { ReactElementProps } from "../../interface";
import Logo from "../../assets/logo.png"

export type ConfigContextType = {
	config: any;
	webChatConfig: any;
	setLogoUrl : (logoUrl: string) => void;
};

export const ConfigContext: Context<ConfigContextType> = createContext<ConfigContextType>(null!);

export const ConfigProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {

	const [config, setConfig] = useState<any>("");
	const [webChatConfig, setWebChatConfig] = useState<any>("");


	// This function is responsible for getting the webchat config for the Twilio Flex Web Chat.
	useEffect(() => {
		
					setConfig({logoUrl : Logo})
				
	}, []);


	const setLogoUrl = async (logoUrl: string) => {

		(async () => {
			setConfig({...config, logoUrl})
		})();
	};


	return (<ConfigContext.Provider value={{ config, webChatConfig, setLogoUrl }}>{children}</ConfigContext.Provider>);
};
