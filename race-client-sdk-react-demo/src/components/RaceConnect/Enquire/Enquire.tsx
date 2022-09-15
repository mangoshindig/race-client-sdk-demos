import { FC } from "react";
import {
	CallContainer
} from "../../../assets/index.styles";
import { Box } from "@twilio-paste/core/box";
import { useFormContext } from "src/hooks/useFormContext";

export const Enquire: FC = () => {

	const { formContainer } = useFormContext();

	return (
		<CallContainer>
			<Box ref={formContainer} />
		</CallContainer>
	);
}

export default Enquire;
