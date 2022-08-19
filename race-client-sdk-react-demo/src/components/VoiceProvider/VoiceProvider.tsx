import { Context, createContext, FC, useState } from "react";
import { Voice } from "@ciptex/race-client-sdk";
import { ReactElementProps } from "../../interface";
import { ACCOUNT_SID, IDENTITY, VOICE_APP_CLI, VOICE_APP_SID } from "../../constants";

export type VoiceContextType = {
	voice?: Voice;
	status: Voice.State;
	isMuted: boolean;
	init: () => void;
	connect: () => void;
	disconnect: () => void;
};

export const VoiceContext: Context<VoiceContextType> = createContext<VoiceContextType>(null!);

export const VoiceProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {
	const [voice, setVoice] = useState<Voice>();
	const [status, setStatus] = useState<Voice.State>("closed");
	const [isMuted, setIsMuted] = useState<boolean>(false);

	const init = (): void => {
		try {
			if(!ACCOUNT_SID || !IDENTITY || !VOICE_APP_SID) {
				throw new Error ("Missing ACCOUNT_SID or IDENTITY or VOICE_APP_SID Variables");
			}

			const v = new Voice({
				accountSid: ACCOUNT_SID,
				identity: IDENTITY,
				voiceAppSid: VOICE_APP_SID
			});

			v.on("voice#ready", () => {
				console.info("[Client] voice#ready recieved");
				setVoice(v);
			});

			v.on("voice#status", (state: Voice.State) => {
				console.info("[Client] voice#status recieved ", state);
				setStatus(state);
			});

			v.on("voice#mute", (is: boolean) => {
				console.info("[Client] voice#mute recieved ", is);
				setIsMuted(is);
			})
		} catch (error) {
			console.error("[Client] ", error);
		}
	}

	const connect = async (): Promise<void> => {
		if(!VOICE_APP_CLI) {
			throw new Error ("Missing VOICE_APP_CLI Variables");
		}

		await voice?.connect({ to: VOICE_APP_CLI, params: {} });
	}

	const disconnect = (): void => {
		voice?.disconnect();
	}

	return (<VoiceContext.Provider value={{ init, connect, disconnect, voice, status, isMuted }}>{children}</VoiceContext.Provider>);
}