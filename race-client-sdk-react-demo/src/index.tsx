import { StrictMode } from "react";
import { render } from "react-dom";
import { ConfigProvider } from "./components/ConfigProvider/ConfigProvider";

import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";

import { DemoApp } from "./DemoApp";

render(
	<StrictMode>
		<ThemeProvider>
			<ConfigProvider>
				
								<DemoApp />
			</ConfigProvider>
		</ThemeProvider>
	</StrictMode>,
	document.getElementById("root")
);
