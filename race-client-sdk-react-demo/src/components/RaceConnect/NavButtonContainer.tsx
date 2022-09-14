import { NavButton } from "./NavButton";

type ButtonProps = {
    setButtonContainer: (buttonContainer: boolean) => void;
    setContainerName: (containerName: string) => void;
  };

// eslint-disable-next-line react/prop-types
export const NavButtonComp = ({ setButtonContainer, setContainerName }: ButtonProps) => {

	return (<>
		<NavButton icon="call" title="Call" onClick={() => {
			setContainerName("call");
			setButtonContainer(false);
		}} />
		<NavButton icon="chat" view="0 0 576 512" title="Chat" onClick={() => {
			setContainerName("chat");
			setButtonContainer(false);
		}} />
		<NavButton icon="enquire" title="Enquire" onClick={() => {
			setContainerName("enquire");
			setButtonContainer(false);
		}} />
		<NavButton icon="video" view="0 0 576 512" title="Video Chat" onClick={() => {
			setContainerName("video");
			setButtonContainer(false);
		}} />
		<NavButton icon="whatsapp" view="0 0 448 512" title="WhatsApp" onClick={() => {
			setContainerName("whatsapp");
			setButtonContainer(false);
		}} />
		<NavButton icon="messenger" title="Messenger" onClick={() => {
			setContainerName("messenger");
			setButtonContainer(false);
		}} />
	</>);
}