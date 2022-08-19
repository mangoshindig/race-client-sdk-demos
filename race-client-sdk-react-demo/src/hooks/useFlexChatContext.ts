import { useContext } from "react";
import { FlexChatContext, FlexChatContextType } from "../components/FlexChatProvider/FlexChatProvider";

export const useFlexChatContext = (): FlexChatContextType => {
	const context = useContext(FlexChatContext);
	if (!context) {
		throw new Error("[RACE SDK] useFlexChatContext must be used within a FlexChatProvider");
	}
	return context;
}