import { FC } from "react";
import {
	CallButtonsContainer,
	ImageContainer,
	Label,
	QrCodeContainer
} from "../../../assets/index.styles";
import Icon from "../../../assets/icons";
import { useConfigContext } from "src/hooks/useConfigContext";
import QRCode from "react-qr-code";
import { Button } from "@twilio-paste/core/button";

export const WhatsApp: FC = () => {

	const { config } = useConfigContext();

	return (
		<QrCodeContainer>
			<CallButtonsContainer>
				<Label>Scan the QR Code below to open app</Label>
				<ImageContainer>
					<QRCode value={config.whatsAppLink} />
				</ImageContainer>
			</CallButtonsContainer>
			<Button size="icon" variant="secondary" as="a" href={config.whatsAppLink}>
				<Icon icon="whatsapp"/>
            Open WhatsApp
			</Button>
		</QrCodeContainer>
	);
}


export default WhatsApp;
