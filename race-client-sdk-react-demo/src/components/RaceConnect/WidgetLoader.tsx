import {  FC, useEffect, useState } from "react";
import { ButtonsContainer, Description, HeaderButtonsContainer, HeaderContainer, HeaderLogo, Image, ParentContainer, WidgetButton } from "../../assets/index.styles";
import { ViewRender } from "./RenderFunction";
import WidgetLtrGif from "../../assets/animated-widget-ltr.gif";
import WidgetUpGif from "../../assets/animated-widget.gif";
import { HeaderButtonComp } from "./HeaderButtonContainer";
import { NavButtonComp } from "./NavButtonContainer";

export const RaceConnect: FC = () => {

	const WidgetDirection = "ltr";
	// This will change the direction of the widget from Left2Right to Bottom2Top
	// const WidgetDirection = "";

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
					<Image src={WidgetDirection ? WidgetLtrGif : WidgetUpGif} />
				</WidgetButton>
			) : null}
			{parentContainer ? (
				<ParentContainer>
					<HeaderContainer>
						<HeaderLogo src="https://cdn.ciptex.com/ciptex-assets/logos/ciptex-dark-logo.png" />
						<HeaderButtonsContainer>
							{!buttonContainer && (
								<HeaderButtonComp icon="back" setShowWidget={setShowWidget} setButtonContainer={setButtonContainer} setParentContainer={setParentContainer} setContainerName={setContainerName} />
							)}
							<HeaderButtonComp icon="close" setShowWidget={setShowWidget} setButtonContainer={setButtonContainer} setParentContainer={setParentContainer} setContainerName={setContainerName} />
						</HeaderButtonsContainer>
					</HeaderContainer>
					{ViewRender(containerName)}
					{buttonContainer && (
						<ButtonsContainer>
							<Description>
								Choose your preferred communication channels to connect with
								Ciptex.
							</Description>
							<NavButtonComp setContainerName={setContainerName} setButtonContainer={setButtonContainer}  />
						</ButtonsContainer>
					)}
				</ParentContainer>
			) : null}
		</>
	)
}