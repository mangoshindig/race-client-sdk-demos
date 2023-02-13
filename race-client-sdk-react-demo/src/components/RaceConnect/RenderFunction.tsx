import Locator from "./Locator/Locator"

export const ViewRender = (containerName: string, conf: any) => {

	console.log('CAZ3', conf)

	switch (containerName) {

	case "locator":
		return (
			<Locator conf = {conf} />
		)

	default:
		return (
			null
		)
	}
}
