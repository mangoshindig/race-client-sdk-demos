/* eslint-disable @typescript-eslint/no-unused-vars */
/* global RaceSDK */
/* global console */
/* global ACCOUNT_SID */
/* global IDENTITY */
/* global document */

let video;
let videoReady = false;
function VideoInit() {
	video = new RaceSDK.Video({ accountSid: ACCOUNT_SID, identity: IDENTITY });

	video.on("video#ready", () => {
		console.log("Video ready");
		videoReady = true;
	});

	video.on("video#created", () => {
		document.getElementById("voice-call-btn").disabled = true;
		document.getElementById("video-call-btn").disabled = true;
		document.getElementById("video-hangup-btn").style.display = "inline";
		document.getElementById("video-mute-btn").style.display = "inline";

		video?.localTracks?.forEach((track) => {
			track.kind === "audio" && track.on("disabled", () => {
				document.getElementById("video-mute-btn").style.display = "none";
				document.getElementById("video-unmute-btn").style.display = "inline";
			});

			track.kind === "audio" && track.on("enabled", () => {
				document.getElementById("video-mute-btn").style.display = "inline";
				document.getElementById("video-unmute-btn").style.display = "none";
			});
		});
	});

	video.on("video#disconnected", () => {
		document.getElementById("voice-call-btn").disabled = false;
		document.getElementById("video-call-btn").disabled = false;
		document.getElementById("video-hangup-btn").style.display = "none";
		document.getElementById("video-mute-btn").style.display = "none";
		document.getElementById("video-unmute-btn").style.display = "none";
		document.getElementById("video-container").style.display = "none";
	});
}

function VideoCallMe() {
	document.getElementById("video-container").style.display = "block";
	video.connect({
		localMediaContainer: document.getElementById("LocalVideoMedia"),
		remoteMediaContainer: document.getElementById("RemoteVideoMedia")
	});
}

function VideoHangup() {
	video.disconnect();
}

function VideoMute() {
	video.mute();
}

function VideoUnmute() {
	video.unmute();
}
