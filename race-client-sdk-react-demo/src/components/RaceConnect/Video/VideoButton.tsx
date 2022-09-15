import { FC } from "react";
import { Button } from "@twilio-paste/core/button";
import { Modal, ModalHeader, ModalHeading, ModalBody, ModalFooter, ModalFooterActions } from "@twilio-paste/core/modal";
import { useUID } from "@twilio-paste/core/uid-library";
import { Box } from "@twilio-paste/core/box";
import { useVideoContext } from "../../../hooks/useVideoContext";
import { MuteButton } from "./MuteButton";
import { UnmuteButton } from "./UnmuteButton";
import Icon from "../../../assets/icons";
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";

export const VideoButton: FC = () => {
	const { video, isMuted, isOpen, localVideoMedia, remoteVideoMedia, connect, disconnect } = useVideoContext();
	const modalHeadingID = useUID();

	return (<>
		<Box display="flex" width="100%" flexDirection="column">
			<Button variant="secondary" size="icon" onClick={connect} loading={!video?.ready}><Icon icon="video" view="0 0 576 512" /> Start Video Call</Button>
		</Box>
		<Modal ariaLabelledby={modalHeadingID} isOpen={isOpen} onDismiss={disconnect} size="default">
			<ModalHeader>
				<ModalHeading as="h3" id={modalHeadingID}>Video Call Us</ModalHeading>
			</ModalHeader>
			<ModalBody>
				<Box position="relative" minHeight="400px">
					<Box ref={localVideoMedia} position="absolute" width="30%" borderRadius="borderRadius30" overflow="hidden" zIndex="zIndex90">

					</Box>
					<Box ref={remoteVideoMedia} position="relative" borderRadius="borderRadius30" overflow="hidden" zIndex="zIndex50">
					</Box>
				</Box>
			</ModalBody>
			<ModalFooter>
				<ModalFooterActions>
					{isMuted ? <UnmuteButton /> : <MuteButton />}
					<Button variant="destructive" size="icon" onClick={disconnect}><CloseIcon decorative={true} />End Call</Button>
				</ModalFooterActions>
			</ModalFooter>
		</Modal></>)
}