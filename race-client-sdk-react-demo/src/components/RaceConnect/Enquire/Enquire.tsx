import { FC, useEffect, useState } from "react";
import { Box } from "@twilio-paste/core/box";
import { useFormContext } from "src/hooks/useFormContext";
import { FormContainer } from "../../../assets/index.styles";
import { Spinner } from "@twilio-paste/core/spinner";
import { Flex } from "@twilio-paste/core";

export const Enquire: FC = () => {

	const { formContainer } = useFormContext();
	const { init: formInit } = useFormContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		formInit();
	}, []);

	useEffect(() => {
		const row = document.querySelector<HTMLButtonElement>(".form-ui-row");
		if (row) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, []);

	return (
		<FormContainer>
			{!loading ? <Box ref={formContainer}></Box> : <Flex vAlignContent="center" hAlignContent="center" height="100%"><Spinner decorative={false} title="Loading" size="sizeIcon80" /></Flex>}
		</FormContainer>
	);
}

export default Enquire;
