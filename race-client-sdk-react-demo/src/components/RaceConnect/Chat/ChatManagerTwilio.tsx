/* eslint-disable */
import { useEffect, useState as useStateReact } from "react";
import {
	FlexWebChatContainer
} from "../../../assets/index.styles";
import * as FlexWebChat from "@twilio/flex-webchat-ui";
import useState from 'react-usestateref'
import { Box, Button, Text } from "@twilio-paste/core";
import styled from "@emotion/styled";

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
	cursor: 'pointer !important'
}

const Wrapper = styled('div')`
	display: flex;
	max-width: 460px;
	min-width: 460px;
	position: absolute;
	float:right;
	bottom: 20px;
	right: 20px;
	flex-direction: column;
	z-index: 100;
	background-color: white;
	border-radius: 25px;
	overflow:hidden;
`;

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



	const startListener = () => {
		console.log('starting listener')
		const c = manager.store.getState().flex.session.channelSid;

		if (c) {
			setChannelSid(c)
		}

		


		console.log('chatclient', manager, manager.chatClient)
		if (manager.chatClient) {



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
						const container = document.querySelector<HTMLDivElement>(".Twilio.Twilio-MainContainer");
						if (container) 
						{
							console.log(container)
							
							// @ts-ignore:
							var rect = document.getElementById('clickyB').getBoundingClientRect();
							//console.log('height', rect,rect.y/rect.top)
							var rect2 = container.getBoundingClientRect();
							console.log('height', rect, rect2, ((rect2.y-rect.y)*-1).toString())

							const l = message.channel.channelState.attributes.clickableMessages.length

							let total = 0

							for (const c of message.channel.channelState.attributes.clickableMessages)
							{
								total = total + 33 + 12
								total = total + (Math.ceil(c.message.length/61)-1)*(58-33)
							}

							

							let a = 65

							if(total > 200)
							{
								a = 55
							}

							if(total > 300)
							{
								a = 45
							}
							console.log(600-total+10, total, 600-total+a)
							
							
							// @ts-ignore: I don't care 
							//container.height = ((rect2.y-rect.y)*-1).toString()
							//container.style.height = (((rect2.y-rect.y)*-1)-130).toString()+'px'
							container.style.height = (600-total+a).toString()+'px'

							//scroll
							const ml = document.querySelector<HTMLDivElement>(".Twilio.Twilio-MessageList");
							// @ts-ignore: I don't care 
							ml.scrollTop = ml.scrollHeight;

						}
						setShow(true)
						

					}
				}
				else {
					console.log('not shelter', message.state.author)
					const container = document.querySelector<HTMLDivElement>(".Twilio.Twilio-MainContainer");
		if (container) {
			// if (clickable.length > 0) {
			// 	container.style.height = "200px";
			// 	container.style.width = "100%";
			// 	container.style.boxShadow = "none";
			// } else {
			container.style.height = "600px";
			container.style.width = "100%";
			container.style.boxShadow = "none";
		}
				}



			})
		}
		
	}

	

	useEffect(() => {
		FlexWebChat.Actions.addListener('afterStartEngagement', startListener)

		

		const container = document.querySelector<HTMLDivElement>(".Twilio.Twilio-MainContainer");
		if (container) {
			// if (clickable.length > 0) {
			// 	container.style.height = "200px";
			// 	container.style.width = "100%";
			// 	container.style.boxShadow = "none";
			// } else {
			container.style.height = "600px";
			container.style.width = "100%";
			container.style.boxShadow = "none";
		}

	}, []);




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
		<>
		<FlexWebChatContainer>
			<FlexWebChat.ContextProvider manager={manager}>
				<Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="flex-end">
					<Box display="flex" flexDirection="row" paddingBottom="space40" justifyContent="space-between" alignItems="center">
						<Box paddingRight="space20">
							<Button variant="secondary" size="icon" onClick={kill}>
								Clear and end chat
							</Button>
						</Box>
						<Box width="fit-content">
							<Text as="p" fontSize="fontSize30" textAlign="right" lineHeight="lineHeight20">
								You can also press escape on your keyboard to clear and close the chat in an emergency
							</Text>
						</Box>
					</Box>

					<FlexWebChat.MainContainer />
					
				</Box>
			</FlexWebChat.ContextProvider>
		</FlexWebChatContainer>
		<Wrapper key="clickyButtons" id="clickyB">
		{clickable && show && clickable.map((m: any, index: number) => (
			<div
				style={bubble}
				onClick={() => click(m.message)} //this.handleBubbleClick(m.message)}
				key={index}
			>
				{m.message}
			</div>
		))}
	</Wrapper></>
	);
};

export default ChatManagerTwilio;