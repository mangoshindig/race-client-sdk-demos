import { useContext } from "react";
import { FlexChatProviderReactContext, FlexChatProviderReactType } from "src/components/FlexChatProvider/FlexChatProviderReact";


export const useFlexChatReactContext = (): FlexChatProviderReactType => {
	const context = useContext(FlexChatProviderReactContext);
	if (!context) {
		throw new Error("[RACE SDK] useFlexChatReactContext must be used within a FlexChatProviderReact");
	}
	return context;
}