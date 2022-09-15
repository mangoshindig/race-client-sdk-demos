import { FC, useEffect } from "react";
import { Box } from "@twilio-paste/core/box";
import { useFormContext } from "src/hooks/useFormContext";
import { FormContainer } from "../../../assets/index.styles";

export const Enquire: FC = () => {

	const { formContainer } = useFormContext();

	const { init: formInit } = useFormContext();

	useEffect(() => {
		// flexChatInit();
		formInit();
	}, []);

	return (
		<FormContainer>
			<Box ref={formContainer}></Box>
		</FormContainer>
	);
}

export default Enquire;
