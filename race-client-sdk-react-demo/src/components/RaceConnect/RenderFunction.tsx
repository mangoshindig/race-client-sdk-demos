




import Booking from "./Booking/Booking"
import Locator from "./Locator/Locator"

export const ViewRender = (containerName: string) => {



	switch (containerName) {

	case "locator":
		return (
			<Locator />
		)
	case "booking":
		return (
			<Booking />
		)
	default:
		return (
			null
		)
	}
}
