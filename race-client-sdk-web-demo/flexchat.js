/* eslint-disable @typescript-eslint/no-unused-vars */
/* global RaceSDK */
/* global console */
/* global ACCOUNT_SID */
/* global FLEXCHAT_FLOW_SID */

function FlexChatInit() {
	const webchat = new RaceSDK.Webchat({ accountSid: ACCOUNT_SID, flowSid: FLEXCHAT_FLOW_SID });
	webchat.on("flexchat#ready", () => {
		console.log("Webchat ready");
		webchat.init();
	});
}