import { Context, createContext, FC, useEffect, useState } from "react";
import { ACCOUNT_SID, FLEXCHAT_FLOW_SID, MOCKAPI } from "src/constants";
import { ReactElementProps } from "../../interface";

export type ConfigContextType = {
	config: any;
	webChatConfig: any;
	setLogoUrl : (logoUrl: string) => void;
};

export const ConfigContext: Context<ConfigContextType> = createContext<ConfigContextType>(null!);

export const ConfigProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {

	const [config, setConfig] = useState<any>("");
	const [webChatConfig, setWebChatConfig] = useState<any>("");

	// This function is responsible for getting the initial config for the for the application such as Account SID, Flex Flow SID, etc.
	useEffect(() => {
		/*fetch(`${MOCKAPI}`)
			.then((response) => response.json())
			.then((data) => {*/
				setConfig({whatsAppLink : 'https://wa.me/+447401259740', facebookLink : 'https://www.ciptex.com'});
			//}
			//)
	}, []);

	// This function is responsible for getting the webchat config for the Twilio Flex Web Chat.
	useEffect(() => {
		fetch(`https://api.ciptex.com/race/${ACCOUNT_SID}/webchat/${FLEXCHAT_FLOW_SID}/config`)
			.then((response) => response.json())
			.then((data) => {
				setWebChatConfig(data);
				setConfig({...config, logoUrl: 'https://images.ctfassets.net/6sxvmndnpn0s/7G0PUuLY0xcDlDeE2VYqyr/9c1f7a5ba3005ebe9a2c54d4a0dc4aa7/Shelter-default-meta-image.png'})
			}
			)
	}, []);

	


	const setLogoUrl = async (logoUrl: string) => {

		(async () => {
			setConfig({...config, logoUrl})
		})();
	};


	return (<ConfigContext.Provider value={{ config, webChatConfig, setLogoUrl }}>{children}</ConfigContext.Provider>);
};
