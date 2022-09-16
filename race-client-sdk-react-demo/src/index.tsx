import { StrictMode } from "react";
import { render } from "react-dom";
import { FlexChatProvider } from "./components/FlexChatProvider/FlexChatProvider";
import { FormProvider } from "./components/FormProvider/FormProvider";
import { SyncProvider } from "./components/SyncProvider/SyncProvider";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import { VideoProvider } from "./components/VideoProvider/VideoProvider";
import { VoiceProvider } from "./components/VoiceProvider/VoiceProvider";
import { DemoApp } from "./DemoApp";

render(
	<StrictMode>
		<ThemeProvider>
			<SyncProvider>
				<VideoProvider>
					<VoiceProvider>
						<FlexChatProvider>
							<FormProvider>
								<DemoApp />
							</FormProvider>
						</FlexChatProvider>
					</VoiceProvider>
				</VideoProvider>
			</SyncProvider>
		</ThemeProvider>
	</StrictMode>,
	document.getElementById("root")
);
