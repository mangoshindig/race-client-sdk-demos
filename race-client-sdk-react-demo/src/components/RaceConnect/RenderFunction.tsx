import Locator from "./Locator/Locator"



export const ViewRender = (containerName: string, conf: any, setShowWidget: (showWidget: boolean) => void) => {


	switch (containerName) {

	case "locator":
		return (
			<Locator conf = {conf} setShowWidget = {setShowWidget} />
		)

	default:
		return (
			null
		)
	}
}
