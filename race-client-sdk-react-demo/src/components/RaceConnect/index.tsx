import { FC, useEffect, useState } from "react";
import { NavButton } from "./components/generic/NavButton";
import Icon from "./assets/icons";
import { ButtonsContainer, Description, HeaderButton, HeaderButtonsContainer, HeaderContainer, HeaderLogo, Image, ParentContainer, WidgetButton } from "./assets/index.styles";
import { ViewRender } from "./utils/RenderFunction";

export const RaceConnect: FC = () => {

	const [showWidget, setShowWidget] = useState(true);
	const [buttonContainer, setButtonContainer] = useState(false);
	const [parentContainer, setParentContainer] = useState(false);
	const [containerName, setContainerName] = useState("");

	useEffect(() => {
		ViewRender(containerName);
		console.log(containerName)
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
						<HeaderLogo src="https://cdn.ciptex.com/ciptex-assets/logos/ciptex-dark-logo.png" />
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
							<NavButton icon="call" title="Call" onClick={() => { setContainerName("call"); setButtonContainer(false); }}/>
							<NavButton icon="chat" view="0 0 576 512" title="Chat" onClick={() => { setContainerName("chat"); setButtonContainer(false); }}/>
							<NavButton icon="enquire" title="Enquire" onClick={() => { setContainerName("enquire"); setButtonContainer(false); }}/>
							<NavButton icon="video" view="0 0 576 512" title="Video Chat" onClick={() => { setContainerName("video"); setButtonContainer(false); }}/>
							<NavButton icon="whatsapp" view="0 0 448 512" title="WhatsApp" onClick={() => { setContainerName("whatsapp"); setButtonContainer(false); }}/>
							<NavButton icon="facebook" title="Facebook Messenger" onClick={() => { setContainerName("facebook"); setButtonContainer(false); }}/>
						</ButtonsContainer>
					)}
				</ParentContainer>
			) : null}
		</>
	)
}
