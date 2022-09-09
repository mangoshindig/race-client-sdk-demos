import { StrictMode } from "react";
import { render } from "react-dom";
import { ConfigProvider } from "./components/ConfigProvider/ConfigProvider";
// import { FlexChatProvider } from "./components/FlexChatProvider/FlexChatProvider";
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
						{/* <FlexChatProvider> */}
						<FormProvider>
							<DemoApp />
						</FormProvider>
						{/* </FlexChatProvider> */}
					</VoiceProvider>
				</VideoProvider>
			</ConfigProvider>
		</ThemeProvider>
	</StrictMode>,
	document.getElementById("root")
);
