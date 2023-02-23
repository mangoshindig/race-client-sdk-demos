import {  FC, useEffect, useState } from "react";
import { ButtonsContainer, Description, HeaderButtonsContainer, HeaderContainer, HeaderLogo, Image, ParentContainer, WidgetButton } from "../../assets/index.styles";
import { ViewRender } from "./RenderFunction";
import Icon from "../../assets/icon-chat.png";
import Logo from "../../assets/logo.png";

import { HeaderButtonComp } from "./HeaderButtonContainer";
import { NavButtonComp } from "./NavButtonContainer";
import { useConfigContext } from "src/hooks/useConfigContext";

interface IProps
{
	conf : any
}


export const RaceConnect: FC<IProps> = ({
	conf 
} ) => {

	const [showWidget, setShowWidget] = useState(true);
	const [buttonContainer, setButtonContainer] = useState(false);
	const [parentContainer, setParentContainer] = useState(false);
	const [containerName, setContainerName] = useState("");
	const { config } = useConfigContext();


	useEffect(() => {
		if(showWidget)
		{
			setShowWidget(true);
			setButtonContainer(false);
			setParentContainer(false);
			setContainerName("");
		}
		else
		{
			setShowWidget(false);
			setButtonContainer(false);
			setParentContainer(true);
			setContainerName("locator");
		}
		ViewRender(containerName, conf, setShowWidget);
	}, [containerName,showWidget]);

	return (
		<>
			{showWidget ? (
				<WidgetButton onClick={() => {
					setShowWidget(false);
					setButtonContainer(true);
					setParentContainer(true);
				}}>
					<Image src={Icon} />
					
				</WidgetButton>
			) : null}
			{parentContainer ? (
				<ParentContainer>
					<HeaderContainer>
						<HeaderLogo src={Logo} />
						<HeaderButtonsContainer>
							{/*!buttonContainer && (
								<HeaderButtonComp icon="back" setShowWidget={setShowWidget} setButtonContainer={setButtonContainer} setParentContainer={setParentContainer} setContainerName={setContainerName} />
							)*/}
							<HeaderButtonComp icon="close" setShowWidget={setShowWidget} setButtonContainer={setButtonContainer} setParentContainer={setParentContainer} setContainerName={setContainerName} />
						</HeaderButtonsContainer>
					</HeaderContainer>
					{ViewRender(containerName, conf, setShowWidget)}
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