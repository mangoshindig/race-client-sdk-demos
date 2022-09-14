import Call from "./Call/Call"
import Enquire from "./Enquire/Enquire"
import Messenger from "./Messenger/Messenger"
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
	default:
		return (
			null
		)
	}
}
