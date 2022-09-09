import { Box } from "@twilio-paste/core/box";
import { Button } from "@twilio-paste/core/button";
import { Text } from "@twilio-paste/core/text";
import { FC, useEffect, useState } from "react";
import Call from "./components/Call";
import Icon from "./icons";
import { Buttons, ButtonsContainer, Description, HeaderButton, HeaderButtonsContainer, HeaderContainer, HeaderLogo, Image, ParentContainer, WidgetButton } from "./index.styles";
import { ViewRender } from "./RenderFunction";

export const RaceConnect: FC = () => {

	const [showWidget, setShowWidget] = useState(true);
	const [buttonContainer, setButtonContainer] = useState(false);
	const [parentContainer, setParentContainer] = useState(false);
	const [containerName, setContainerName] = useState("");

	useEffect(() => {
		ViewRender(containerName);
	}, [containerName]);

	return (
		<>
			{showWidget ? (
				<WidgetButton onClick={() => {
					setShowWidget(false);
					setButtonContainer(true);
					setParentContainer(true);
				}}>
					<Image src="https://cdn.ciptex.com/ciptex-assets/animated-widget-ltr.gif" />
				</WidgetButton>
			) : null}
			{parentContainer ? (
				<ParentContainer>
					<HeaderContainer>
						<HeaderLogo src="https://cdn.ciptex.com/ciptex-assets/logos/ciptex-dark-logo.png"></HeaderLogo>
						<HeaderButtonsContainer>
							{!buttonContainer && (
								<HeaderButton onClick={() => {
									setShowWidget(false);
									setButtonContainer(true);
									setParentContainer(true);
									setContainerName("");
								}}>
									<Icon icon="back" view="0 0 448 512" />
								</HeaderButton>
							)}
							<HeaderButton onClick={() => {
								setShowWidget(true);
								setButtonContainer(false);
								setParentContainer(false);
								setContainerName("");
							}}>
								<Icon icon="close" view="0 0 352 512" />
							</HeaderButton>
						</HeaderButtonsContainer>
					</HeaderContainer>
					{ViewRender(containerName)}
					{buttonContainer && (
						<ButtonsContainer>
							<Description>
								Choose your preferred communication channels to connect with
								Ciptex.
							</Description>
							<Box paddingX="space20" display="grid" rowGap="space50">
								<Button onClick={() => {
									setContainerName("call");
									setButtonContainer(false);
								}} variant="secondary">
									<Box display="flex" justifyContent="flex-start" padding="space10" marginLeft="space20">
										<Box>
											<Icon icon="call" />
										</Box>
										<Box paddingLeft="space40">
											<Text as="p" fontWeight="fontWeightBold" fontSize="fontSize40">
									Call
											</Text>
										</Box>
									</Box>
								</Button>
								<Button onClick={() => {
									setContainerName("video");
									setButtonContainer(false);
								}} variant="secondary">
									<Box display="flex" justifyContent="flex-start" padding="space10" marginLeft="space20">
										<Box>
											<Icon icon="chat" />
										</Box>
										<Box paddingLeft="space40">
											<Text as="p" fontWeight="fontWeightBold" fontSize="fontSize40">
									Chat
											</Text>
										</Box>
									</Box>
								</Button>
								<Button onClick={() => {
									setContainerName("video");
									setButtonContainer(false);
								}} variant="secondary">
									<Box display="flex" justifyContent="flex-start" padding="space10" marginLeft="space20">
										<Box>
											<Icon icon="enquire" />
										</Box>
										<Box paddingLeft="space40">
											<Text as="p" fontWeight="fontWeightBold" fontSize="fontSize40">
									Enquire
											</Text>
										</Box>
									</Box>
								</Button>
								<Button onClick={() => {
									setContainerName("video");
									setButtonContainer(false);
								}} variant="secondary">
									<Box display="flex" justifyContent="flex-start" padding="space10" marginLeft="space20">
										<Box>
											<Icon icon="video" />
										</Box>
										<Box paddingLeft="space40">
											<Text as="p" fontWeight="fontWeightBold" fontSize="fontSize40">
									Video Chat
											</Text>
										</Box>
									</Box>
								</Button>
								<Button onClick={() => {
									setContainerName("video");
									setButtonContainer(false);
								}} variant="secondary">
									<Box display="flex" justifyContent="flex-start" padding="space10" marginLeft="space20">
										<Box>
											<Icon icon="whatsapp" />
										</Box>
										<Box paddingLeft="space40">
											<Text as="p" fontWeight="fontWeightBold" fontSize="fontSize40">
									WhatsApp
											</Text>
										</Box>
									</Box>
								</Button>
								<Button onClick={() => {
									setContainerName("video");
									setButtonContainer(false);
								}} variant="secondary">
									<Box display="flex" justifyContent="flex-start" padding="space10" marginLeft="space20">
										<Box>
											<Icon icon="facebook" />
										</Box>
										<Box paddingLeft="space40">
											<Text as="p" fontWeight="fontWeightBold" fontSize="fontSize40">
									Facebook Messenger
											</Text>
										</Box>
									</Box>
								</Button>
							</Box>
						</ButtonsContainer>
					)}
				</ParentContainer>
			) : null}
		</>
	)
}
