/* eslint @typescript-eslint/no-var-requires: "off" */

import { FC, useState, ChangeEvent, useEffect, useRef } from "react";
import { CallContainer } from "../../../assets/index.styles";
import { Select, Option } from "@twilio-paste/core/select";
import { Input } from "@twilio-paste/core/input";
import { Button } from "@twilio-paste/core/button";
import { Box } from "@twilio-paste/core/box";
import { Stack } from "@twilio-paste/core/stack";
import { HelpText } from "@twilio-paste/core/help-text";
import {
	ChatLog,
	ChatMessage,
	ChatMessageMeta,
	ChatMessageMetaItem,
	ChatBubble,
	ChatBookend,
	ChatBookendItem
} from "@twilio-paste/core/chat-log";
import { Checkbox } from "@twilio-paste/core/checkbox";
import { InlineWidget } from "react-calendly";
import FadeIn from "react-fade-in";
import { EditIcon } from "@twilio-paste/icons/esm/EditIcon";

interface IProps {
	conf: any;
	setShowWidget: (showWidget: boolean) => void;
}

export const Locator: FC<IProps> = ({ conf, setShowWidget }) => {
	const [locatorDetails, setLocatorDetails] = useState<any>("");
	const [step, setStep] = useState(0);
	const [stepZeroSelection, setStepZeroSelection] = useState("");
	const [consent, setConsent] = useState(false);
	const bookingWidgetDivRef = useRef<HTMLDivElement>(null);
	const endRef = useRef<HTMLDivElement>(null);
	const [startTime, setStartTime] = useState("");

	const [zipError, setZipError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [emailError, setEmailError] = useState("");

	const [locatorResults, setLocatorResults] = useState<any>("");

	const [back, setBack] = useState<any>("back");
	const [next, setNext] = useState<any>("Next");
	const [yes, setYes] = useState<any>("Yes");
	const [no, setNo] = useState<any>("No");
	const [you, setYou] = useState<any>("You");
	const [chatMessageAriaPenny, setchatMessageAriaPenny] = useState<any>("said by Penny");
	const [chatMessageAriaSelf, setchatMessageAriaSelf] = useState<any>("said by you");
	const [locatorError, setLocatorError] = useState("Sorry! It looks like we are experiencing some technical difficulties with this app. You can still get connected to an agency for financial help by submitting a form or calling one of our toll free numbers on nfcc.org");

	const [isSingle, setIsSingle] = useState(false);
	const [singleContinue, setSingleContinue] = useState(false);
	const axios = require('axios');


	useEffect(() => {
		const d = new Date();
		let mins = d.getMinutes().toString()

		if (mins.length == 1) {
			mins = '0' + mins
		}

		setStartTime(d.getHours() + ":" + d.getMinutes())
	}, []);

	useEffect(() => {
		console.log('CAZ', conf)
		if (!conf.showQ1) {
			setStep(2);
		}
		if (conf.language === 'Spanish') {
			//init strings
			setBack("atrás")
			setchatMessageAriaPenny("dicho por Penny")
			setchatMessageAriaSelf("dicho por ti")
			setNext("próximo")
			setYou("Tú")
			setYes('Si')
			setNo('No')
			setLocatorError("¡Lo siento! Parece que estamos experimentando algunas dificultades técnicas con esta aplicación. Todavía puede conectarse con una agencia para obtener ayuda financiera enviando un formulario o llamando a uno de nuestros números gratuitos en nfcc.org")
		}

		if (conf.otherServices.length === 1 && !conf.showQ1) {
			let l = { ...locatorDetails };
			l.serviceName = conf.otherServices[0].key;
			setLocatorDetails(l);
			setIsSingle(true)
			setStep(3)
			console.log(conf.otherServices[0].key)
		}
		else {
			setSingleContinue(true)
		}

	}, [conf]);


	const onChange = ({
		target
	}: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		console.log("onChange");
		console.log(target);
		console.log(target.id, target.value);

		let l = { ...locatorDetails };
		l[target.id] = target.value;
		setLocatorDetails(l);
	};

	const onChangeIncrement = ({
		target
	}: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		console.log("onChangeIncrement");
		console.log(target);
		console.log(target.id, target.value);

		if (target.id == 'serviceName') {
			if (target.value == 'default') {
				return
			}
		}

		let l = { ...locatorDetails };
		l[target.id] = target.value;
		setLocatorDetails(l);
		setStep(step + 1);
	};

	const stepZeroOnChange = (target: string) => {
		console.log("zero");
		console.log(target);
		setStepZeroSelection(target);
		if (target === "More Options") {
			setStep(2);
			if(conf.language === 'Spanish')
			{
				setStepZeroSelection("Mas opciones")
			}
		} else {
			setStep(3);
			let l = { ...locatorDetails };
			if (target === "Credit Card Help") {
				l["serviceName"] = "Credit Counseling";
				if (conf.language === 'Spanish') {
					setStepZeroSelection("Asesoramiento crediticio");
				}
			} else {
				l["serviceName"] = "Student Loan Help";
				if (conf.language === 'Spanish') {
					setStepZeroSelection("Préstamos de Estudiantes");
				}
			}
			setLocatorDetails(l);
		}
	};

	const jumpToEnd = () => {
		console.log("jumpToEnd");

		setTimeout(function () {
			if (endRef.current) {
				endRef.current.scrollIntoView({ behavior: 'smooth' });

			}
		}, 200)
	};

	const increment = () => {
		console.log("increment");
		setStep(step + 1);

		jumpToEnd()
	};

	const cont = () => {
		console.log("continue");
		setSingleContinue(true)

		jumpToEnd()
	};

	const close = () => {
		console.log("close");
		setShowWidget(true);
	};

	const setStepNumber = (s: number) => {
		console.log('setStepNumber')

		if (s == 4) {
			let l = { ...locatorDetails };
			delete l.zipCode;
			delete l.emailAddress;
			delete l.phoneNumber;
			setLocatorDetails(l);
		}

		setStep(s);
		//jumpToEnd()
	};


	const callLocator = async () => {
		console.log("callLocator");
		let isError = false;

		//clear previous validation
		setZipError("")
		setEmailError("")
		setPhoneError("")

		//validation
		console.log('validating', locatorDetails)

		if (!Object.keys(locatorDetails).includes('zipCode')) {
			if (conf.language.toLowerCase() === 'spanish') {
				setZipError("Por favor ingrese un código postal válido")
			}
			else {
				setZipError("Please enter a valid ZIP")
			}

			console.log('zip error1')
			isError = true;
		}
		else if (! /[0-9]{5}/.test(locatorDetails.zipCode)) {
			if (conf.language.toLowerCase() === 'spanish') {
				setZipError("Por favor ingrese un código postal válido")
			}
			else {
				setZipError("Please enter a valid ZIP")
			}
			console.log('zip error')
			isError = true;
		}

		if (!Object.keys(locatorDetails).includes('phoneNumber')) {
			if (conf.language.toLowerCase() === 'spanish') {
				setPhoneError("Por favor ingrese un número de teléfono válido")
			}
			else {
				setPhoneError("Please enter a valid phone")
			}

			console.log('phone error1')
			isError = true;
		}
		// eslint-disable-next-line
		else if (! /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(locatorDetails.phoneNumber) || locatorDetails.phoneNumber.length == 1) {
			if (conf.language.toLowerCase() === 'spanish') {
				setPhoneError("Por favor ingrese un número de teléfono válido")
			}
			else {
				setPhoneError("Please enter a valid phone")
			}
			console.log('phone error')
			isError = true;
		}

		if (!Object.keys(locatorDetails).includes('emailAddress')) {
			if (conf.language.toLowerCase() === 'spanish') {
				setEmailError("Por favor ingrese un correo electrónico válido")
			}
			else {
				setEmailError("Please enter a valid email")
			}

			console.log('email error1')
			isError = true;
		}
		// eslint-disable-next-line
		else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(locatorDetails.emailAddress) || locatorDetails.emailAddress.length == 1) {
			if (conf.language.toLowerCase() === 'spanish') {
				setEmailError("Por favor ingrese un correo electrónico válido")
			}
			else {
				setEmailError("Please enter a valid email")
			}
			console.log('email error')
			isError = true;
		}

		if (!isError) {
			setStep(step + 1);

			let data = JSON.stringify({
				"service": locatorDetails.serviceName,
				"language": conf.language ?? "English",
				"zipCode": locatorDetails.zipCode,
				"email": locatorDetails.emailAddress,
				"phone": locatorDetails.phoneNumber,
				"firstName": locatorDetails.firstName,
				"lastName": locatorDetails.lastName,
				"useProd": conf.useProd
			});

			let url = 'https://chat-widget-5710.twil.io/proxy-request'


			let config = {
				method: 'post',
				url,
				headers: {
					'Content-Type': 'application/json'
				},
				data: data
			};

			axios(config)
				.then(function (response: any) {
					console.log('CAZ LOC', JSON.stringify(response.data));
					setLocatorResults(response.data)
					setStep(6);
					console.log('found agency')
					jumpToEnd()
				})
				.catch(function (error: any) {

					if (error.response) {
						if (error.response.data) {
							if (error.response.data === 'Invalid zipCode') {
								if (conf.language === 'Spanish') {
									setLocatorError('Parece que ingresó un código postal no válido, regrese e intente nuevamente')
								}
								else {
									setLocatorError('Looks like you entered an invalid zip code, please go back and try again')
								}

							}
						}
					}

					setStep(99);
					console.log('error finding agency')
					jumpToEnd()
				});


		}
		else {
			console.log('unknown error')
			setStep(99);
			console.log('error finding agency')
			jumpToEnd()
		}

	};

	const showBooking = () => {
		console.log('showBooking', bookingWidgetDivRef)
		setStep(8);
		setTimeout(function () {
			if (bookingWidgetDivRef.current) {
				console.log(bookingWidgetDivRef.current)
				bookingWidgetDivRef.current.scrollIntoView({ behavior: 'smooth' });

			}
		}, 1000)
	};

	return (
		<CallContainer>
			{" "}
			<ChatLog>
				{step >= 0 && !isSingle && (
					<>
						<ChatBookend>
							<ChatBookendItem>{conf.language === "Spanish" && "Hoy" || "Today"}</ChatBookendItem>
							<ChatBookendItem>
								<strong>{conf.language === "Spanish" && "Charla comenzó con" || "Chat Started with"} Penny</strong> ・ {startTime}
							</ChatBookendItem>
						</ChatBookend>
						<ChatMessage variant="inbound">
							<ChatBubble>{conf.language === "Spanish" && "¡Hola! ¿En qué puedo ayudarte?" || "Hello! What can I help you with?"}</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaPenny}>
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>

						{step == 0 && conf.showQ1 && (
							<FadeIn>
								<Box
									display="flex"
									paddingTop="space50"
									justifyContent="center"
									alignItems="center"
								>
									<Button
										variant="secondary"
										fullWidth={true}
										onClick={(e) => stepZeroOnChange("Credit Card Help")}
									>

										{conf.language === "Spanish" && "Asesoramiento crediticio" || "Credit Card Help"}
									</Button>
								</Box>
								<Box
									display="flex"
									paddingTop="space50"
									justifyContent="center"
									alignItems="center"
								>
									<Button
										variant="secondary"
										fullWidth={true}
										onClick={(e) => stepZeroOnChange("Student Loan Debt")}
									>

										{conf.language === "Spanish" && "Préstamos de Estudiantes" || "Student Loan Debt"}
									</Button>
								</Box>
								<Box
									display="flex"
									paddingTop="space50"
									justifyContent="center"
									alignItems="center"
								>
									<Button
										variant="secondary"
										fullWidth={true}
										onClick={(e) => stepZeroOnChange("More Options")}
									>

										{conf.language === "Spanish" && "Mas opciones" || "More Options"}
									</Button>
								</Box>
							</FadeIn>
						)}
					</>
				)}
				{step >= 1 && !isSingle && conf.showQ1 && (
					<Box display="flex" justifyContent="flex-end">
						<Stack orientation="horizontal" spacing="space10">
							<Box marginBottom="space60">
								<Button variant="reset" size="reset" onClick={(e) => setStepNumber(0)}>
									<EditIcon decorative={false} title="edit" /> {back}</Button></Box>
							<ChatMessage variant="outbound">
								<ChatBubble>{stepZeroSelection}</ChatBubble>
								<ChatMessageMeta aria-label={chatMessageAriaSelf}>
									<ChatMessageMetaItem>{you}</ChatMessageMetaItem>
								</ChatMessageMeta>
							</ChatMessage>
						</Stack></Box>
				)}

				{step == 2 && !isSingle && (
					<><FadeIn>
						{conf.showQ1 && <ChatMessage variant="inbound">
							<ChatBubble>

								{conf.language === "Spanish" && "Por favor, elija entre estas otras opciones de asesoramiento" || "Please choose from other counseling options below:"}
							</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaPenny}>
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>}

						{step == 2 && (
							<Box
								display="flex"
								paddingTop="space50"
								justifyContent="center"
								alignItems="center"
							>
								<Select id="serviceName" onChange={(e) => onChangeIncrement(e)} >

									<Option value="default">
										{conf.language === "Spanish" && "-- Seleccione un servicio --" || "-- Select a service --"}
									</Option>

									{conf
										? conf &&
										conf.otherServices.map((service: any, index: number) => (
											<Option key={index} value={service.key}>
												{conf.language === "Spanish" && service.spanishValue || service.value}
											</Option>
										))
										: null!}



								</Select></Box>
						)}
					</FadeIn></>
				)}

				{step >= 3 && (
					<>


						{["More Options","Mas opciones"].includes(stepZeroSelection) && !isSingle && <ChatMessage variant="inbound">
							<ChatBubble>
								{conf.language === "Spanish" && "Por favor, elija entre estas otras opciones de asesoramiento" || "Please choose from other counseling options below:"}
							</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaPenny}>
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>}

						{locatorDetails.serviceName && !isSingle && ["", "More Options", "Mas opciones"].includes(stepZeroSelection) && (<>
							<Box display="flex" justifyContent="flex-end">
								<Stack orientation="horizontal" spacing="space10">
									<Box marginBottom="space60">
										<Button variant="reset" size="reset" onClick={(e) => setStepNumber(2)}>
											<EditIcon decorative={false} title="edit" /> {back}</Button></Box>
									<ChatMessage variant="outbound">


										<ChatBubble>{

											conf.language === "Spanish" && conf.otherServices.find((x: any) => x.key === locatorDetails?.serviceName).spanishValue || conf.otherServices.find((x: any) => x.key === locatorDetails?.serviceName).value

										}

										</ChatBubble>



										<ChatMessageMeta aria-label={chatMessageAriaSelf}>
											<ChatMessageMetaItem>{you}</ChatMessageMetaItem>
										</ChatMessageMeta>
									</ChatMessage></Stack></Box>
						</>)}
						{isSingle && <ChatMessage variant="inbound">
							<ChatBubble>
								{conf.language === "Spanish" && "¡Hola! ¿Puedo ayudarle a conectarse con una agencia asociada para discutir su situación financiera?" || "Hello! Can I help connect you with a member agency to discuss your financial situation?"}

							</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaPenny}>
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>}
						{isSingle && !singleContinue && <>

							<Box
								display="flex"
								paddingTop="space50"
								padding="space30"
							>


								<Button variant="secondary" fullWidth={true} onClick={(e) => cont()}>
									{yes}
								</Button><Box
									display="flex"
									paddingTop="space50"
									padding="space10"
								/>
								<Button variant="secondary" fullWidth={true} onClick={(e) => close()}>
									{no}
								</Button>
							</Box>
						</>}
						<FadeIn>
							{singleContinue && isSingle && <ChatMessage variant="outbound">
								<ChatBubble>{yes}</ChatBubble>
								<ChatMessageMeta aria-label={chatMessageAriaSelf}>
									<ChatMessageMetaItem>{you}</ChatMessageMetaItem>
								</ChatMessageMeta>
							</ChatMessage>}
							{singleContinue &&
								<ChatMessage variant="inbound">
									<ChatBubble>
										{conf.language === "Spanish" && "¡Bueno, empecemos! ¿Cómo te llamas?" || "Great, let's get started! What is your name?"}

									</ChatBubble>
									<ChatMessageMeta aria-label={chatMessageAriaPenny}>
										<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
									</ChatMessageMeta>
								</ChatMessage>}

							{step == 3 && singleContinue && (
								<FadeIn>
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
										alignItems="center"
									>
										<Input
											aria-describedby="firstName"
											id="firstName"
											name="firstName"
											type="text"
											placeholder= {conf.language === 'Spanish' && 'Nombre' || 'First name'}
											onChange={(e) => onChange(e)}
											required
											value={locatorDetails.firstName}
										/></Box>
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
										alignItems="center"
									>
										<Input
											aria-describedby="lastName"
											id="lastName"
											name="lastName"
											type="text"
											placeholder={conf.language === 'Spanish' && 'Apellido' || 'Last name'}
											onChange={(e) => onChange(e)}
											required
											value={locatorDetails.lastName}
										/></Box>
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
										alignItems="center"
									>
										<Button variant="primary" onClick={(e) => increment()} disabled={!locatorDetails.firstName || !locatorDetails.lastName}>
											{next}
										</Button></Box></FadeIn>

							)}
						</FadeIn></>
				)}

				{step >= 4 && (
					<>
						<Box display="flex" justifyContent="flex-end">
							<Stack orientation="horizontal" spacing="space10">
								<Box marginBottom="space60">
									<Button variant="reset" size="reset" onClick={(e) => setStepNumber(3)}>
										<EditIcon decorative={false} title="edit" /> {back}</Button></Box>
								<ChatMessage variant="outbound">
									<ChatBubble>
										{locatorDetails?.firstName + " " + locatorDetails?.lastName}
									</ChatBubble>
									<ChatMessageMeta aria-label={chatMessageAriaSelf}>
										<ChatMessageMetaItem>{you}</ChatMessageMetaItem>
									</ChatMessageMeta>
								</ChatMessage></Stack></Box>

						<ChatMessage variant="inbound">
							<ChatBubble>
								{conf.language === "Spanish" && "Vamos a obtener más información" || "Let's get some more information"}

							</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaPenny}>
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>

						{step == 4 && (
							<>
								<FadeIn>
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
									>
										<Input
											aria-describedby="zipCode"
											id="zipCode"
											name="zipCode"
											type="text"
											placeholder={conf.language === "Spanish" && "Código postal" || "ZIP"}
											onChange={(e) => onChange(e)}
											required
											value={locatorDetails.zipCode}
											hasError={zipError.length > 0}
										/></Box>
									{zipError.length > 0 && <HelpText id="zip_help_text" variant="error">{zipError}</HelpText>}
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
										alignItems="center"
									>
										<Input
											aria-describedby="phoneNumber"
											id="phoneNumber"
											name="phoneNumber"
											type="tel"
											placeholder={conf.language === "Spanish" && "Teléfono" || "Phone"}
											onChange={(e) => onChange(e)}
											required
											value={locatorDetails.phoneNumber}
											hasError={phoneError.length > 0}
										/>

									</Box>{phoneError.length > 0 && <HelpText id="phone_help_text" variant="error">{phoneError}</HelpText>}
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
										alignItems="center"
									>
										<Input
											aria-describedby="emailAddress"
											id="emailAddress"
											name="emailAddress"
											type="email"
											placeholder={conf.language === "Spanish" && "Correo electrónico" || "Email"}
											onChange={(e) => onChange(e)}
											required
											value={locatorDetails.emailAddress}
											hasError={emailError.length > 0}
										/></Box>
									{emailError.length > 0 && <HelpText id="email_help_text" variant="error">{emailError}</HelpText>}
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
										alignItems="center"
									>
										<Checkbox
											checked={consent}
											id="consent"
											value="consent"
											name="consent"
											onChange={(event) => {
												setConsent(event.target.checked);
											}}
										>
											{conf.language === "Spanish" && "La NFCC y sus agencias miembros pueden comunicarse conmigo por teléfono, correo electrónico o mensaje de texto." || "The NFCC and its member agencies may contact me by phone, email or text"}


										</Checkbox></Box>
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
										alignItems="center"
									>
										<Button variant="primary" onClick={(e) => callLocator()} disabled={!consent}>
											{next}
										</Button></Box></FadeIn>

							</>
						)}
					</>
				)}
				{step >= 5 && (
					<><FadeIn>
						<Box display="flex" justifyContent="flex-end">
							<Stack orientation="horizontal" spacing="space10">
								<Box marginBottom="space60">
									<Button variant="reset" size="reset" onClick={(e) => setStepNumber(4)}>
										<EditIcon decorative={false} title="edit" /> {back}</Button></Box>
								<ChatMessage variant="outbound">
									<ChatBubble>
										<div>
											{(conf.language === "Spanish" && "Código postal" || "ZIP") + ": " +
												locatorDetails?.zipCode}
										</div>
										<div>{(conf.language === "Spanish" && "Correo electrónico" || "Email") + ": " +
											locatorDetails?.emailAddress}</div>
										<div>{(conf.language === "Spanish" && "Teléfono" || "Phone") + ": " +
											locatorDetails?.phoneNumber}</div>

									</ChatBubble>
									<ChatMessageMeta aria-label={chatMessageAriaSelf}>
										<ChatMessageMetaItem>{you}</ChatMessageMetaItem>
									</ChatMessageMeta>
								</ChatMessage></Stack></Box>


						<ChatMessage variant="inbound">
							<ChatBubble>
								{conf.language === "Spanish" && "Bueno, te estamos buscando una agencia asociada ahora..." || "Okay, great, we're finding you an agency now..."}

							</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaPenny}>
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>
					</FadeIn>


					</>
				)}
				{step >= 6 && step != 99 && locatorResults && locatorResults.calendlyUrl && (<FadeIn>
					<Box
						display="flex"
						paddingTop="space50"
						padding="space30"
					></Box>
					<ChatMessage variant="inbound">
						<ChatBubble>
							{conf.language === "Spanish" && "Has estado conectado a " || "You've been connected to "}<b>{locatorResults.agencyName}</b>
							{conf.language === "Spanish" && ". Esta agencia le ofrece la opción de reservar una cita en línea, ¿le gustaría seguir adelante y reservar una sesión de asesoramiento?" || ". This agency has online booking, would you like to go ahead and book a counseling session?"}


						</ChatBubble>
						<ChatMessageMeta aria-label={chatMessageAriaPenny}>
							<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
						</ChatMessageMeta>
					</ChatMessage>

					{step == 6 && (
						<>
							<Box
								display="flex"
								paddingTop="space50"
								padding="space30"
							>


								<Button variant="secondary" fullWidth={true} onClick={(e) => showBooking()}>
									{yes}
								</Button><Box
									display="flex"
									paddingTop="space50"
									padding="space10"
								/>
								<Button variant="secondary" fullWidth={true} onClick={(e) => increment()}>
									{no}
								</Button>
							</Box>
						</>)}
				</FadeIn>)}

				{step >= 6 && step != 99 && locatorResults && !locatorResults.calendlyUrl && (<FadeIn>
					<Box
						display="flex"
						paddingTop="space50"
						padding="space30"
					></Box>
					<ChatMessage variant="inbound">
						<ChatBubble>


							{conf.language === "Spanish" && "Has estado conectado a " || "You've been connected to "}<b>{locatorResults.agencyName}</b>
							{conf.language === "Spanish" && ". Un miembro de su personal se pondrá en contacto. También recibirás un correo electrónico con otras formas de ponerse en contacto." || ". A member of their team will be reaching out to you. You will also receive an email with other ways to get in touch."}

						</ChatBubble>
						<ChatMessageMeta aria-label={chatMessageAriaPenny}>
							<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
						</ChatMessageMeta>
					</ChatMessage>


				</FadeIn>)}




				{step == 7 && (<>
					<Box display="flex" justifyContent="flex-end">
						<Stack orientation="horizontal" spacing="space10">
							<Box marginBottom="space60">
								<Button variant="reset" size="reset" onClick={(e) => setStepNumber(6)}>
									<EditIcon decorative={false} title="edit" /> {back}</Button></Box>
							<ChatMessage variant="outbound">
								<ChatBubble>{no}</ChatBubble>
								<ChatMessageMeta aria-label={chatMessageAriaSelf}>
									<ChatMessageMetaItem>{you}</ChatMessageMetaItem>
								</ChatMessageMeta>
							</ChatMessage></Stack></Box>
					<FadeIn>
						<Box
							display="flex"
							paddingTop="space50"
							padding="space30"
						></Box>
						<ChatMessage variant="inbound">
							<ChatBubble>
								{conf.language === "Spanish" && "¡Ningún problema! Un miembro de su personal se pondrá en contacto. También recibirás un correo electrónico con otras formas de ponerse en contacto. " || "No problem! A member of their team will be reaching out to you. You will also receive an email with other ways to get in touch."}

							</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaPenny}>
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>


					</FadeIn></>
				)}
				{step >= 8 && step != 99 && (
					<>
						<ChatMessage variant="outbound">
							<ChatBubble>{yes}</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaSelf}>
								<ChatMessageMetaItem>{you}</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>
						<div id='bookingWidget' ref={bookingWidgetDivRef}>
							<FadeIn >
								<InlineWidget url={locatorResults.calendlyUrl} pageSettings={{
									backgroundColor: 'ffffff',
									hideEventTypeDetails: true,
									hideLandingPageDetails: false,
									primaryColor: '00a2ff',
									textColor: '4d5055',
									hideGdprBanner: true
								}} prefill={{
									email: locatorDetails.emailAddress,
									firstName: locatorDetails.firstName,
									lastName: locatorDetails.lastName,
									name: locatorDetails.firstName + ' ' + locatorDetails.lastName + ' (' + locatorDetails.serviceName + ' - ' + conf.language + ')', customAnswers: {

										a2: locatorDetails.serviceName,
										a3: locatorDetails.phoneNumber
									}
								}} /></FadeIn></div>
					</>
				)}
				{step == 99 && (<>
					<FadeIn>
						<Box
							display="flex"
							paddingTop="space50"
							padding="space30"
						></Box>
						<ChatMessage variant="inbound">
							<ChatBubble>
								{locatorError}
							</ChatBubble>
							<ChatMessageMeta aria-label={chatMessageAriaPenny}>
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>
					</FadeIn>
				</>
				)}
				<div ref={endRef}></div>
			</ChatLog>
		</CallContainer>
	);
};

export default Locator;
