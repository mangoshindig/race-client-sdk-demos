import {  FC, useEffect, useState } from "react";
import { ButtonsContainer, Description, HeaderButtonsContainer, HeaderContainer, HeaderLogo, Image, ParentContainer, WidgetButton } from "../../assets/index.styles";
import { ViewRender } from "./RenderFunction";
import WidgetLtrGif from "../../assets/animated-widget-ltr.gif";
import WidgetUpGif from "../../assets/animated-widget.gif";
import { HeaderButtonComp } from "./HeaderButtonContainer";
import { NavButtonComp } from "./NavButtonContainer";
import { useConfigContext } from "src/hooks/useConfigContext";

export const RaceConnect: FC = () => {

	const WidgetDirection = "ltr";
	// This will change the direction of the widget from Left to Right to Bottom to Top
	// const WidgetDirection = "";

	const [showWidget, setShowWidget] = useState(true);
	const [buttonContainer, setButtonContainer] = useState(false);
	const [parentContainer, setParentContainer] = useState(false);
	const [containerName, setContainerName] = useState("");
	const { config } = useConfigContext();

	useEffect(() => {
		
		ViewRender(containerName, setShowWidget);
	}, [containerName]);


	useEffect(() => {
		console.log('showWidget',showWidget)
		if(showWidget)
		{
			setShowWidget(true);
			setButtonContainer(false);
			setParentContainer(false);
			setContainerName("");
			console.log('hiding')
		}
	}, [ showWidget]);


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
						<HeaderLogo src={config?.logoUrl} />
						<HeaderButtonsContainer>
							{!buttonContainer && (
								<HeaderButtonComp icon="back" setShowWidget={setShowWidget} setButtonContainer={setButtonContainer} setParentContainer={setParentContainer} setContainerName={setContainerName} />
							)}
							<HeaderButtonComp icon="close" setShowWidget={setShowWidget} setButtonContainer={setButtonContainer} setParentContainer={setParentContainer} setContainerName={setContainerName} />
						</HeaderButtonsContainer>
					</HeaderContainer>
					{ViewRender(containerName,setShowWidget)}
					{buttonContainer && (
						<ButtonsContainer>
							<Description>
								Choose your preferred communication channels to connect with
								us.
							</Description>
							<NavButtonComp setContainerName={setContainerName} setButtonContainer={setButtonContainer}  />
						</ButtonsContainer>
					)}
				</ParentContainer>
			) : null}
		</>
	)
}