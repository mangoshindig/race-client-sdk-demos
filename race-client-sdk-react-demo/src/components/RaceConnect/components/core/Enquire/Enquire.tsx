import { FC, useState } from "react";
// import { withRouter } from "react-router-dom";
import {
	Buttons,
	FormContainer,
	FormInputContainer,
	Input,
	Label,
	LabelContainer,
	Textarea,
	SubmitMessage,
	Description
} from "../../../assets/index.styles";
import Icon from "src/components/RaceConnect/assets/icons";
import { Form } from "@ciptex/race-sdk";
import { useConfigContext } from "src/hooks/useConfigContext";

export const Enquiry: FC = () => {

	const { config } = useConfigContext();

	const [formSubmitted, setFormSubmitted] = useState(false);
	const [name, setName] = useState("");
	const [company, setCompany] = useState("");
	const [email, setEmail] = useState("");
	const [enquiry, setEnquiry] = useState("");

	// const { data } = this.props;

	const Invalid = (e: any) => {
		switch (e.target.name) {
		case "name":
			e.target.setCustomValidity("E.g Jon Smith");
			break;
		case "company":
			e.target.setCustomValidity("E.g Ciptex Ltd");
			break;
		case "email":
			e.target.setCustomValidity("Must be example@example.com");
			break;
		default:
			e.target.setCustomValidity("Invalid format");
		}
	};

	// onChange function for input fields
	const onChange = (e: any) => {
		switch (e.target.name) {
		case "name":
			setName(e.target.value);
			break;
		case "company":
			setCompany(e.target.value);
			break;
		case "email":
			setEmail(e.target.value);
			break;
		case "enquiry":
			setEnquiry(e.target.value);
			break;
		default:
			break;
		}
	};

	// const onChange = (e: { target: { setCustomValidity?: any; name?: any; value?: any; }; }) => {
	// 	const { name, value } = e.target;
	// 	e.target.value({ [name]: value });
	// 	e.target.setCustomValidity("");
	// };

	const result = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		Form.submit({
			accountSid: config.twilioSid,
			id: config.twilioFormId,
			formData: {
				name: name,
				company: company,
				email: email,
				enquiry: enquiry
			}
		})

		useState({ formSubmitted: true });

	};

	return (
		<FormContainer onSubmit={result}>
			{!formSubmitted ? (
				<>
					<FormInputContainer>
						<LabelContainer>
							<Label>Full Name:</Label>
							<Input
								name="name"
								required
								type="text"
								value={name}
								onChange={onChange}
								onInvalid={Invalid}
							></Input>
						</LabelContainer>
						<LabelContainer>
							<Label>Company:</Label>
							<Input
								name="company"
								required
								type="text"
								value={company}
								onChange={onChange}
								onInvalid={Invalid}
							></Input>
						</LabelContainer>
						<LabelContainer>
							<Label>Email:</Label>
							<Input
								name="email"
								required
								type="email"
								value={email}
								onChange={onChange}
								onInvalid={Invalid}
							></Input>
						</LabelContainer>
						<LabelContainer>
							<Label>Enquiry:</Label>
							<Textarea
								name="enquiry"
								required
								value={enquiry}
								onChange={onChange}
								onInvalid={Invalid}
							></Textarea>
						</LabelContainer>
					</FormInputContainer>
					<Buttons type="submit">
						<Icon icon="submit" view="0 0 1024 1024" width="20" height="20" />
						Submit
					</Buttons>
				</>
			) : (
				<SubmitMessage>
					<Description>Thanks for your enquiry.</Description>
				</SubmitMessage>
			)}
		</FormContainer>
	);
}

export default Enquiry;
