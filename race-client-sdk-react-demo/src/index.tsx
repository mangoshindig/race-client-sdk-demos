import { StrictMode } from "react";
import { render } from "react-dom";
import { ConfigProvider } from "./components/ConfigProvider/ConfigProvider";
import { FlexChatProviderReact } from "./components/FlexChatProvider/FlexChatProviderReact";
import { FormProvider } from "./components/FormProvider/FormProvider";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import { VideoProvider } from "./components/VideoProvider/VideoProvider";
import { VoiceProvider } from "./components/VoiceProvider/VoiceProvider";
import { DemoApp } from "./DemoApp";

render(
	<StrictMode>
		<ThemeProvider>
			<ConfigProvider>
				<VideoProvider>
					<VoiceProvider>
						<FormProvider>
							<FlexChatProviderReact>
								<DemoApp />
							</FlexChatProviderReact>
						</FormProvider>
					</VoiceProvider>
				</VideoProvider>
			</ConfigProvider>
		</ThemeProvider>
	</StrictMode>,
	document.getElementById("root")
);
