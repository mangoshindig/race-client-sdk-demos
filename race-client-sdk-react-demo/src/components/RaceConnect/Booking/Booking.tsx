import { FC } from "react";
import {
	BookingContainer
} from "../../../assets/index.styles";
import { InlineWidget } from "react-calendly";

export const Booking: FC = () => {



	return (
		<BookingContainer>
			
			
      <InlineWidget url="https://calendly.com/caroline-stephenson" />

		</BookingContainer>
	);
};

export default Booking;