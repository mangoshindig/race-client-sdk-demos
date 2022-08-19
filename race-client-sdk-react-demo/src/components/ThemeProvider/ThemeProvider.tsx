import { FC } from "react";
import { Theme } from "@twilio-paste/core/theme";
import { ReactElementProps } from "../../interface";

export const ThemeProvider: FC<ReactElementProps>  = ({ children }) => {
	return <Theme.Provider theme="default">{children}</Theme.Provider>;
};
