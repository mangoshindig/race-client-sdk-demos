import Call from "./Call/Call"
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
	case "chat":
		return (
			<Call />
		)
	default:
		return (
			null
		)
	}
}
