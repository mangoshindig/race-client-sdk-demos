import { useContext } from "react";
import { VideoContext, VideoContextType } from "../components/VideoProvider/VideoProvider";

export const useVideoContext = (): VideoContextType => {
	const context = useContext(VideoContext);
	if (!context) {
		throw new Error("[RACE SDK] useVideoContext must be used within a VideoProvider");
	}
	return context;
}