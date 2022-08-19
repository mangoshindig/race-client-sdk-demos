import { useContext } from "react";
import { VoiceContext, VoiceContextType } from "../components/VoiceProvider/VoiceProvider";

export const useVoiceContext = (): VoiceContextType => {
	const context = useContext(VoiceContext);
	if (!context) {
		throw new Error("[RACE SDK] useVoiceContext must be used within a VoiceProvider");
	}
	return context;
}