import { FC } from "react";
import {
	CallContainer,
	CallButtonsContainer,
	LabelWithMargin
} from "../../../assets/index.styles";
import { VideoButton } from "./VideoButton";

export const Video: FC = () => {

	return (
		<CallContainer>
			<CallButtonsContainer>
				<LabelWithMargin>Click to start a video call.</LabelWithMargin>
				<VideoButton />
			</CallButtonsContainer>
		</CallContainer>
	);
}

export default Video;
