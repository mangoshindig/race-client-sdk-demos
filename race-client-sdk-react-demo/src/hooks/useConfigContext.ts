import { useContext } from "react";
import { ConfigContext, ConfigContextType } from "src/components/ConfigProvider/ConfigProvider";

export const useConfigContext = (): ConfigContextType => {
	const context = useContext(ConfigContext);
	if (!context) {
		throw new Error("[RACE SDK] useConfigContext must be used within a ConfigProvider");
	}
	return context;
}