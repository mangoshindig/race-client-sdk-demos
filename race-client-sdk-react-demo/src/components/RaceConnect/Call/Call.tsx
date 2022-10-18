import { FC } from "react";
import {
	CallContainer,
	CallButtonsContainer,
	SeperatorParagraph,
	LabelWithMargin
} from "../../../assets/index.styles";
import Icon from "../../../assets/icons";
import { useConfigContext } from "src/hooks/useConfigContext";
import { Button } from "@twilio-paste/core/button";
import { CallButton } from "./CallButton";

export const Call: FC = () => {

	// Grabbing the config from the ConfigProvider, this includes to number.
	const { config } = useConfigContext();

	return (
		<CallContainer>
			<CallButtonsContainer>
				<LabelWithMargin>Click to call via your phone.</LabelWithMargin>
				<Button variant="secondary" as="a" href={`tel:${config?.phoneNumer}`}>
					<Icon icon="call" />
					Click to call
				</Button>
				<SeperatorParagraph />
				<LabelWithMargin>
					Click to call via WebRTC. (WiFi Call)
				</LabelWithMargin>
				<CallButton />
			</CallButtonsContainer>
		</CallContainer>
	);
}

export default Call;
