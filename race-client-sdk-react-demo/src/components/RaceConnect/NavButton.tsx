import { FC } from "react";
import {
	Buttons
} from "../../assets/index.styles";
import Icon from "../../assets/icons";

interface NavButtonType {
	icon: string;
	view?: string;
	title: string;
	onClick: () => void;
}

export const NavButton: FC<NavButtonType> = ({ icon, view, title, onClick }) => {
	return (
		<Buttons onClick={onClick}>
			<Icon icon={icon} view={view}/>
			{title}
		</Buttons>
	);
};