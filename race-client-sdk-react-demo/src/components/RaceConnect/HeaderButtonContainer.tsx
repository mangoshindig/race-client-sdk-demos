import Icon from "../../assets/icons";
import { HeaderButton } from "../../assets/index.styles";

type ButtonProps = {
    setShowWidget: (showWidget: boolean) => void;
    setButtonContainer: (buttonContainer: boolean) => void;
    setParentContainer: (parentContainer: boolean) => void;
    setContainerName: (containerName: string) => void;
    icon: string;
  };

// eslint-disable-next-line react/prop-types
export const HeaderButtonComp = ({ setShowWidget, setButtonContainer, setParentContainer, setContainerName, icon }: ButtonProps) => {

	return (
		<> {icon === "back" ? <HeaderButton onClick={() => {
			setShowWidget(false);
			setButtonContainer(true);
			setParentContainer(true);
			setContainerName("");
		}}>
			<Icon icon="back" view="0 0 448 512" />
		</HeaderButton> : <HeaderButton onClick={() => {
			setShowWidget(true);
			setButtonContainer(false);
			setParentContainer(false);
			setContainerName("");
		}}>
			<Icon icon="close" view="0 0 352 512" />
		</HeaderButton>}
		</>);
}