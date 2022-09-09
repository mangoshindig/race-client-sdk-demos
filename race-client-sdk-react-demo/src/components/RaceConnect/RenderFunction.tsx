import Call from "./components/Call"

export const ViewRender = (containerName: string) => {

	switch (containerName) {
	case "call":
		return (
			<Call />
		)
	case "video":
		return (
			<Call />
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
