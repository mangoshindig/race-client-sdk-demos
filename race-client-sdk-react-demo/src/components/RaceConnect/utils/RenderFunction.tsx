import Call from "../components/core/Call/Call"
import Chat from "../components/core/Chat/Chat"
import Enquire from "../components/core/Enquire/Enquire"

export const ViewRender = (containerName: string) => {
	switch (containerName) {
	case "call":
		return (
			<Call />
		)
	case "chat":
		return (
			<Chat />
		)
	case "enquire":
		return (
			<Enquire />
		)
	case "video":
		return (
			<Call />
		)
	default:
		return (
			null
		)
	}
}

export default ViewRender;