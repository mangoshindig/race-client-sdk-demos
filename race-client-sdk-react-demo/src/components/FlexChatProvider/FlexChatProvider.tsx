import { Context, createContext, FC, useState } from "react";
import { Webchat } from "@ciptex/race-client-sdk";
import { ReactElementProps } from "../../interface";
import { ACCOUNT_SID, FLEXCHAT_FLOW_SID } from "../../constants";

export type FlexChatContextType = {
	init: () => void;
    flexChat?: Webchat
};

export const FlexChatContext: Context<FlexChatContextType> = createContext<FlexChatContextType>(null!);

export const FlexChatProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {
	const [flexChat, setFlexChat] = useState<Webchat>();

	const init = async () => {
		try {
			if(!ACCOUNT_SID || !FLEXCHAT_FLOW_SID) {
				throw new Error ("Missing ACCOUNT_SID or FLEXCHAT_FLOW_SID Variables");
			}

			const v = new Webchat({
				accountSid: ACCOUNT_SID,
				flowSid: FLEXCHAT_FLOW_SID
			});

			v.on("flexchat#ready", () => {
				console.info("[Client] flexchat#ready recieved");
				setFlexChat(v);
				v.init();
			});
		} catch (error) {
			console.error("[Client] ", error);
		}
	}

	return (<FlexChatContext.Provider value={{ flexChat, init }}>{children}</FlexChatContext.Provider>);
}