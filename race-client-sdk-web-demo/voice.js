/* eslint-disable @typescript-eslint/no-unused-vars */
/* global RaceSDK */
/* global console */
/* global document */
/* global ACCOUNT_SID */
/* global VOICE_APP_SID */
/* global VOICE_APP_CLI */
/* global IDENTITY */

let voice;
let voiceReady;
function VoiceInit() {
	voice = new RaceSDK.Voice({ accountSid: ACCOUNT_SID, identity: IDENTITY, voiceAppSid: VOICE_APP_SID });

	voice.on("voice#ready", () => {
		console.log("Voice ready");
		voiceReady = true;
	});

	voice.on("voice#status", (state) => {
		console.log(state);
		if(state === "open") {
			document.getElementById("voice-call-btn").disabled = true;
			document.getElementById("video-call-btn").disabled = true;
			document.getElementById("voice-hangup-btn").style.display = "inline";
			document.getElementById("voice-mute-btn").style.display = "inline";
		}
		else {
			document.getElementById("voice-call-btn").disabled = false;
			document.getElementById("video-call-btn").disabled = false;
			document.getElementById("voice-hangup-btn").style.display = "none";
			document.getElementById("voice-mute-btn").style.display = "none";
			document.getElementById("voice-unmute-btn").style.display = "none";
		}
	});

	voice.on("voice#mute", (isMuted) => {
		if(isMuted) {
			document.getElementById("voice-mute-btn").style.display = "none";
			document.getElementById("voice-unmute-btn").style.display = "inline";
		} else {
			document.getElementById("voice-mute-btn").style.display = "inline";
			document.getElementById("voice-unmute-btn").style.display = "none";
		}
	});
}

function VoiceCallMe() {
	voice.connect({ to: VOICE_APP_CLI });
}

function VoiceHangup() {
	voice.disconnect();
}

function VoiceMute() {
	voice.call.mute(true);
}

function VoiceUnmute() {
	voice.call.mute(false);
}