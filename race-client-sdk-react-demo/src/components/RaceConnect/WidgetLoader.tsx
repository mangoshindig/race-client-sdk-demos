import {  FC, useEffect, useState } from "react";
import { ButtonsContainer, Description, HeaderButtonsContainer, HeaderContainer, HeaderLogo, Image, ParentContainer, WidgetButton } from "../../assets/index.styles";
import { ViewRender } from "./RenderFunction";
import Icon from "../../assets/icon-chat.png";

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
		ViewRender(containerName, conf);
		console.log('CAZ2', conf)
	}, [containerName]);

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
						<HeaderLogo src={config?.logoUrl} />
						<HeaderButtonsContainer>
							{/*!buttonContainer && (
								<HeaderButtonComp icon="back" setShowWidget={setShowWidget} setButtonContainer={setButtonContainer} setParentContainer={setParentContainer} setContainerName={setContainerName} />
							)*/}
							<HeaderButtonComp icon="close" setShowWidget={setShowWidget} setButtonContainer={setButtonContainer} setParentContainer={setParentContainer} setContainerName={setContainerName} />
						</HeaderButtonsContainer>
					</HeaderContainer>
					{ViewRender(containerName, conf)}
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