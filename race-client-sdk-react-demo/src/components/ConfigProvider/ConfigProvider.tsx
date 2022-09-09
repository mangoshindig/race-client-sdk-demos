import { Context, createContext, FC, useEffect, useState } from "react";
import { MOCKAPI } from "src/constants";
import { ReactElementProps } from "../../interface";

export type ConfigContextType = {
	config: any;
};

export const ConfigContext: Context<ConfigContextType> = createContext<ConfigContextType>(null!);

export const ConfigProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {

	const [config, setConfig] = useState<boolean>(false);

	useEffect(() => {
		fetch(`${MOCKAPI}`)
			.then((response) => response.json())
			.then((data) => {
				setConfig(data);
			}
			)
	}, []);

	return (<ConfigContext.Provider value={{ config }}>{children}</ConfigContext.Provider>);
};
