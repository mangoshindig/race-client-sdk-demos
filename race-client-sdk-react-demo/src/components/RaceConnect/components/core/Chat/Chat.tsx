import { FC } from "react";
import {
	CallContainer,
	CallButtonsContainer,
	LabelWithMargin
} from "../../../assets/index.styles";
import Icon from "../../../assets/icons";
// import { useConfigContext } from "src/hooks/useConfigContext";
import { Button } from "@twilio-paste/core/button";

export const Chat: FC = () => {

	// const { config } = useConfigContext();

	return (
		<CallContainer>
			<CallButtonsContainer>
				<LabelWithMargin>Click to chat with us.</LabelWithMargin>
				<Button variant="secondary">
					<Icon icon="chat" />
					Chat
				</Button>
			</CallButtonsContainer>
			{/* {hangUpButton ? (
					<Button onClick={() => disconnect()} variant="primary">
						<Icon view="0 0 640 512" color="#fff" icon="hangup" />
					</Button>
				) : null} */}
		</CallContainer>
	);
}


export default Chat;
