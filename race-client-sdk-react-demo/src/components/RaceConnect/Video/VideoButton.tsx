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

	// const [modalMode, setModalMode] = useState(false);
	// useEffect(() => {
	// 	if (isOpen === false) {
	// 		setModalMode(false);
	// 	}
	// }, [isOpen]);

	return (<>
		<Box display="flex" width="100%" flexDirection="column">
			<Button variant="secondary" size="default" onClick={connect} loading={!video?.ready}><Icon icon="video" view="0 0 576 512" /> Start Video Call</Button>
		</Box>
		{/* { !modalMode ?
			<Box display="flex" width="100%" minHeight="100%" justifyContent="end" rowGap="space50" flexDirection="column">
				<Box height="100%">
					<Box ref={localVideoMedia} position="absolute" width="100px" borderRadius="borderRadius30" overflow="hidden" zIndex="zIndex90" />
					<Box ref={remoteVideoMedia} position="relative" borderRadius="borderRadius30" overflow="hidden" zIndex="zIndex50" />
				</Box>
				{isOpen ? <Box display="flex" width="100%" justifyContent="space-between">
					<Button variant="secondary" onClick={() => setModalMode(true)}>Expand</Button>
					{isMuted ? <UnmuteButton /> : <MuteButton />}
					<Button variant="destructive" size="icon" onClick={disconnect}><CloseIcon decorative={true} />End Call</Button>
				</Box> : null}
			</Box> : */}
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
		</Modal>
		{/* } */}
	</>)
}