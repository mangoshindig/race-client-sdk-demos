import { FC } from "react";
import {
	QrCodeContainer,
	CallButtonsContainer,
	ImageContainer,
	Label,
	ButtonsLink
} from "../../../assets/index.styles";
import Icon from "src/components/RaceConnect/assets/icons";
// import QRCode from "react-qr-code";
import { useConfigContext } from "src/hooks/useConfigContext";

export const WhatsApp: FC = () => {

	const { config } = useConfigContext();

	return (
		<QrCodeContainer>
			<CallButtonsContainer>
				<Label>Scan the QR Code below to open app</Label>
				<ImageContainer>
					{/* BUG - QRCode throwing error */}
					{/* <QRCode value={config.whatsAppLink} /> */}
				</ImageContainer>
			</CallButtonsContainer>
			<ButtonsLink href={config.whatsAppLink}>
				<Icon icon="whatsapp" />
                    Open WhatsApp
			</ButtonsLink>
		</QrCodeContainer>
	);
}

export default WhatsApp;
