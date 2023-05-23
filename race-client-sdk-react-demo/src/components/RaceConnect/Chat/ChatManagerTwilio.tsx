/* eslint-disable */
import { useEffect, useState as useStateReact } from "react";
import {
	FlexWebChatContainer
} from "../../../assets/index.styles";
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import useState from 'react-usestateref'
import { Box, Button, Text } from "@twilio-paste/core";

const bubble = {
	paddingLeft: '12px',
	paddingRight: '12px',
	color: 'black',
	// paddingTop: '20px',
	paddingBottom: '6px',
	margin: '10px 10px',
	// position: 'relative',
	// overflowX: 'hidden',
	display: 'flex',
	background: '#ffffff',
	borderRadius: '0px',
	fontSize: '1em',
	fontWeight: 'light',
	//width: '100%'
	//textAlign: 'center'
	borderStyle: 'solid',
	borderWidth: '1px',
	cursor: 'pointer !important',
}

const wrapper = {
	display: 'contents',
	maxWidth: '300px'
}



export type FlexWebChatContainerProps = {
	manager: FlexWebChat.Manager;
	setShowWidget: (showWidget: boolean) => void;
};

export const ChatManagerTwilio = ({ manager, setShowWidget }: FlexWebChatContainerProps) => {



	const [clickable, setClickable, clickableRef] = useState([])
	const [channelSid, setChannelSid] = useStateReact('')
	const [show, setShow, showRef] = useState(false)




	useEffect(() => {

		const button = document.querySelector<HTMLButtonElement>(".Twilio.Twilio-EntryPoint");
		if (button) {
			button.style.display = "none";
			button.click();
		}


	}, [manager]);

	useEffect(() => {
		const header = document.querySelector<HTMLButtonElement>(".Twilio.Twilio-MainHeader");
		if (header) {
			header.style.display = "none";
		}
	}, [manager]);

	useEffect(() => {
		const container = document.querySelector<HTMLButtonElement>(".Twilio.Twilio-MainContainer");
		if (container) {
			container.style.boxShadow = "none";
			container.style.width = "100%";
			container.style.height = "250px";
		}
	}, [manager]);

	useEffect(() => {

		setTimeout(() => {
			if (manager) {

				const c = manager.store.getState().flex.session.channelSid;

				if (c) {
					setChannelSid(c)
				}

				console.log('help me', manager, manager.chatClient)
				manager.chatClient.on('messageAdded', function (message) {

					console.log('caz new message', message);
					if (showRef.current) {
						setShow(false)
					}

					if (message.state.author == 'Shelter') {
						console.log('it is shelter!', message.channel.channelState.attributes.clickableMessages, clickableRef.current)
						if (message.channel.channelState.attributes.clickableMessages != clickableRef.current && message.channel.channelState.attributes.clickableMessages != undefined) {
							setClickable(message.channel.channelState.attributes.clickableMessages)
							console.log('caz clickable changed', clickable, message.channel.channelState.attributes.clickableMessages)
							setShow(true)

						}
					}
					else {
						console.log('not shelter', message.state.author)
					}



				})

			}


		}, 7000)

	}, []);

	useEffect(() => {

		console.log('caz show', show)



	}, [show]);


	useEffect(() => {

		console.log('caz clickable', clickable)



	}, [clickable]);




	/*
		useEffect(() => {
			console.log('caz ch', channelSid)
	
			if (channelSid) {
				manager.chatClient.getChannelBySid(channelSid).then(channel => { channel.getMessages().then(messages => { console.log('caz manager here ', messages) }) })
	
	
	
	
	
			}
	
	
		}, [channelSid]);*/




	const click = (message: string) => {
		console.log('caz click', message);
		manager
			.chatClient.getChannelBySid(channelSid)
			.then(channel => channel.sendMessage(message));
		setShow(false)
	}

	const kill = () => {
		FlexWebChat.Actions.invokeAction('RestartEngagement');
		FlexWebChat.Actions.invokeAction('ToggleChatVisibility');
		setShowWidget(true);
	}

	document.addEventListener('keyup', (e) => {
		if (e.code === 'Escape') {
			kill()
		}

	})



	manager.strings.PredefinedChatMessageBody = "Welcome to Shelter's webchat.";
	manager.strings.PredefinedChatMessageAuthorName = "Shelter";
	manager.strings.WelcomeMessage = "Welcome to Shelter Chat";

	return (
		<FlexWebChatContainer>
			<FlexWebChat.ContextProvider manager={manager}>
				<Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="flex-end">
					<Box alignSelf="flex-start">
						<Button variant="secondary" size="icon" onClick={kill}>
							Clear and end chat
						</Button>
					</Box>
					<Box paddingTop="space60">
						<Text as="p" fontSize="fontSize30" lineHeight="lineHeight20">
							You can also press escape on your keyboard to clear and close the chat in an emergency
						</Text>
					</Box>

					<FlexWebChat.MainContainer />
					<div key="clickyButtons" style={wrapper} >
						{clickable && show && clickable.map((m: any, index: number) => (
							<div
								style={bubble}
								onClick={() => click(m.message)} //this.handleBubbleClick(m.message)}
								key={index}
							>
								{m.message}
							</div>
						))}
					</div></Box>
			</FlexWebChat.ContextProvider>
		</FlexWebChatContainer>
	);
};

export default ChatManagerTwilio;