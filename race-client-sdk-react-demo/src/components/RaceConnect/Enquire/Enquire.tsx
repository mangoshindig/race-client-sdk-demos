import { FC, useEffect } from "react";
import { Box } from "@twilio-paste/core/box";
import { useFormContext } from "src/hooks/useFormContext";
import { FormContainer } from "../../../assets/index.styles";

export const Enquire: FC = () => {

	const { formContainer } = useFormContext();
	const { init: formInit } = useFormContext();

	useEffect(() => {
		formInit();
	}, []);


	return (
		<FormContainer>
			{/* <Flex vAlignContent="center" hAlignContent="center" height="100%">
					<Spinner size="sizeIcon80" decorative={false} title="Loading" />
				</Flex> */}
			<Box ref={formContainer}></Box>
		</FormContainer>
	);
}

export default Enquire;
