import Call from "./Call/Call"
import Chat from "./Chat/Chat"
import Enquire from "./Enquire/Enquire"
import Messenger from "./Messenger/Messenger"
import Video from "./Video/Video"
import WhatsApp from "./WhatsApp/WhatsApp"

export const ViewRender = (containerName: string) => {

	switch (containerName) {
	case "call":
		return (
			<Call />
		)
	case "whatsapp":
		return (
			<WhatsApp />
		)
	case "messenger":
		return (
			<Messenger />
		)
	case "enquire":
		return (
			<Enquire />
		)
	case "video":
		return (
			<Video />
		)
	case "chat":
		return (
			<Chat />
		)
	default:
		return (
			null
		)
	}
}
