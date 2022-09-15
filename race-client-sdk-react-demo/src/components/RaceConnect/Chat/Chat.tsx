import { FC } from "react";
import {
	CallContainer,
	CallButtonsContainer
} from "../../../assets/index.styles";

export const Chat: FC = () => {

	return (
		<CallContainer>
			{/* <Box ref={flexChat} /> */}
			<CallButtonsContainer>
				<p>Test test</p>
			</CallButtonsContainer>
		</CallContainer>
	);
}

export default Chat;
