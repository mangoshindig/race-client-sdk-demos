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
import { Checkbox, CheckboxGroup } from "@twilio-paste/core/checkbox";
import { InlineWidget } from "react-calendly";
import FadeIn from "react-fade-in";
import { EditIcon } from "@twilio-paste/icons/esm/EditIcon";

interface IProps {
	conf: any
}

export const Locator: FC<IProps> = ({ conf }) => {
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
		if(!conf.showQ1)
		{
			setStep(2);
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
		} else {
			setStep(3);
			let l = { ...locatorDetails };
			if (target === "Credit Card Help") {
				l["serviceName"] = "Credit Counseling";
			} else {
				l["serviceName"] = "Student Loan Help";
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


	const callLocator = () => {
		console.log("callLocator");
		let isError = false;

		//clear previous validation
		setZipError("")
		setEmailError("")
		setPhoneError("")

		//validation
		console.log('validating', locatorDetails)

		if (!Object.keys(locatorDetails).includes('zipCode')) {
			setZipError("Please enter a valid ZIP")
			console.log('zip error1')
			isError = true;
		}
		else if (! /[0-9]{5}/.test(locatorDetails.zipCode)) {
			setZipError("Please enter a valid ZIP")
			console.log('zip error')
			isError = true;
		}

		if (!Object.keys(locatorDetails).includes('phoneNumber')) {
			setPhoneError("Please enter a valid phone")
			console.log('phone error1')
			isError = true;
		}
		// eslint-disable-next-line
		else if (! /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(locatorDetails.phoneNumber) || locatorDetails.phoneNumber.length == 1) {
			setPhoneError("Please enter a valid phone")
			console.log('phone error')
			isError = true;
		}

		if (!Object.keys(locatorDetails).includes('emailAddress')) {
			setEmailError("Please enter a valid email")
			console.log('email error1')
			isError = true;
		}
		// eslint-disable-next-line
		else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(locatorDetails.emailAddress) || locatorDetails.emailAddress.length == 1) {
			setEmailError("Please enter a valid email")
			console.log('email error')
			isError = true;
		}

		if (!isError) {
			setStep(step + 1);
			//TODO call the locator and return output
			setTimeout(function () {
				setStep(6);
				console.log('found agency')
				jumpToEnd()
			}, 1000)
		}
		else {
			console.log('nope')
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
				{step >= 0 && (
					<>
						<ChatBookend>
							<ChatBookendItem>Today</ChatBookendItem>
							<ChatBookendItem>
								<strong>Chat Started with Penny</strong> ・ {startTime}
							</ChatBookendItem>
						</ChatBookend>
						<ChatMessage variant="inbound">
							<ChatBubble>Hello! What can I help you with?</ChatBubble>
							<ChatMessageMeta aria-label="said by Penny">
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
										Credit Card Help
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
										Student Loan Debt
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
										More Options
									</Button>
								</Box>
							</FadeIn>
						)}
					</>
				)}
				{step >= 1 && conf.showQ1 && (
					<Box display="flex" justifyContent="flex-end">
						<Stack orientation="horizontal" spacing="space10">
							<Box marginBottom="space60">
								<Button variant="reset" size="reset" onClick={(e) => setStepNumber(0)}>
									<EditIcon decorative={false} title="edit" /> back</Button></Box>
							<ChatMessage variant="outbound">
								<ChatBubble>{stepZeroSelection}</ChatBubble>
								<ChatMessageMeta aria-label="said by you">
									<ChatMessageMetaItem>You</ChatMessageMetaItem>
								</ChatMessageMeta>
							</ChatMessage>
						</Stack></Box>
				)}

				{step == 2 && (
					<><FadeIn>
						{conf.showQ1 && <ChatMessage variant="inbound">
							<ChatBubble>
								Please choose from other counseling options below:
							</ChatBubble>
							<ChatMessageMeta aria-label="said by Penny">
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
										-- Select a service --
									</Option>

									{conf
										? conf &&
										conf.otherServices.map((service: any, index: number) => (
											<Option key={index} value={service.value}>
												{service.key}</Option>
										))
										: null!}


									{/*
									<Option value="First Time Homebuyer">
										First Time Home Buyer
                </Option>
									<Option value="Small Business Owner">
										Small Business Owner
                </Option>
									<Option value="Foreclosure Prevention">
										Foreclosure Prevention
                </Option>
									<Option value="Reverse Mortgage">Reverse Mortgage Help</Option>
									<Option value="Bankruptcy">Bankruptcy Guidance</Option>
									<Option value="Overall Budget and Financial Review">
										Overall Financial Review
									</Option>*/}
								</Select></Box>
						)}
					</FadeIn></>
				)}

				{step >= 3 && (
					<>


						{stepZeroSelection == "More Options" && <ChatMessage variant="inbound">
							<ChatBubble>
								Please choose from other counseling options below:
              </ChatBubble>
							<ChatMessageMeta aria-label="said by Penny">
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>}

						{locatorDetails.serviceName && ["", "More Options"].includes(stepZeroSelection) && (<>
							<Box display="flex" justifyContent="flex-end">
								<Stack orientation="horizontal" spacing="space10">
									<Box marginBottom="space60">
										<Button variant="reset" size="reset" onClick={(e) => setStepNumber(2)}>
											<EditIcon decorative={false} title="edit" /> back</Button></Box>
									<ChatMessage variant="outbound">


										<ChatBubble>{locatorDetails?.serviceName}</ChatBubble>



										<ChatMessageMeta aria-label="said by you">
											<ChatMessageMetaItem>You</ChatMessageMetaItem>
										</ChatMessageMeta>
									</ChatMessage></Stack></Box>
						</>)}
						<FadeIn>
							<ChatMessage variant="inbound">
								<ChatBubble>
									Great, let&apos;s get started! What is your name?
              </ChatBubble>
								<ChatMessageMeta aria-label="said by Penny">
									<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
								</ChatMessageMeta>
							</ChatMessage>

							{step == 3 && (
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
											placeholder="First name"
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
											placeholder="Last name"
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
											Next
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
										<EditIcon decorative={false} title="edit" /> back</Button></Box>
								<ChatMessage variant="outbound">
									<ChatBubble>
										{locatorDetails?.firstName + " " + locatorDetails?.lastName}
									</ChatBubble>
									<ChatMessageMeta aria-label="said by you">
										<ChatMessageMetaItem>You</ChatMessageMetaItem>
									</ChatMessageMeta>
								</ChatMessage></Stack></Box>

						<ChatMessage variant="inbound">
							<ChatBubble>Let&apos;s get some more information</ChatBubble>
							<ChatMessageMeta aria-label="said by Penny">
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
											placeholder="ZIP"
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
											placeholder="Phone"
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
											placeholder="Email"
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
											The NFCC and its member agencies may contact me by phone,
											email or text
                  </Checkbox></Box>
									<Box
										display="flex"
										paddingTop="space50"
										justifyContent="center"
										alignItems="center"
									>
										<Button variant="primary" onClick={(e) => callLocator()} disabled={!consent}>
											Next
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
										<EditIcon decorative={false} title="edit" /> back</Button></Box>
								<ChatMessage variant="outbound">
									<ChatBubble>
										<div>
											{"ZIP: " +
												locatorDetails?.zipCode}
										</div>
										<div>{"Email: " +
											locatorDetails?.emailAddress}</div>
										<div>{"Phone: " +
											locatorDetails?.phoneNumber}</div>

									</ChatBubble>
									<ChatMessageMeta aria-label="said by you">
										<ChatMessageMetaItem>You</ChatMessageMetaItem>
									</ChatMessageMeta>
								</ChatMessage></Stack></Box>


						<ChatMessage variant="inbound">
							<ChatBubble>
								Okay, great, we&apos;re finding you an agency now...
              </ChatBubble>
							<ChatMessageMeta aria-label="said by Penny">
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>
					</FadeIn>


					</>
				)}
				{step >= 6 && (<FadeIn>
					<Box
						display="flex"
						paddingTop="space50"
						padding="space30"
					></Box>
					<ChatMessage variant="inbound">
						<ChatBubble>
							You&apos;ve been connected to <b>Agency A</b>. This agency has online booking, would you like to go ahead and book a counseling session?
              </ChatBubble>
						<ChatMessageMeta aria-label="said by Penny">
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
									Yes
                </Button><Box
									display="flex"
									paddingTop="space50"
									padding="space10"
								/>
								<Button variant="secondary" fullWidth={true} onClick={(e) => increment()}>
									No
                </Button>
							</Box>
						</>)}
				</FadeIn>)}




				{step == 7 && (<>
					<Box display="flex" justifyContent="flex-end">
						<Stack orientation="horizontal" spacing="space10">
							<Box marginBottom="space60">
								<Button variant="reset" size="reset" onClick={(e) => setStepNumber(6)}>
									<EditIcon decorative={false} title="edit" /> back</Button></Box>
							<ChatMessage variant="outbound">
								<ChatBubble>No</ChatBubble>
								<ChatMessageMeta aria-label="said by you">
									<ChatMessageMetaItem>You</ChatMessageMetaItem>
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
								No problem! A member of their team will be reaching out to you. You will also receive an email with other ways to get in touch.
					</ChatBubble>
							<ChatMessageMeta aria-label="said by Penny">
								<ChatMessageMetaItem>Penny</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>


					</FadeIn></>
				)}
				{step >= 8 && (
					<>
						<ChatMessage variant="outbound">
							<ChatBubble>Yes</ChatBubble>
							<ChatMessageMeta aria-label="said by you">
								<ChatMessageMetaItem>You</ChatMessageMetaItem>
							</ChatMessageMeta>
						</ChatMessage>
						<div id='bookingWidget' ref={bookingWidgetDivRef}>
							<FadeIn >
								<InlineWidget url="https://calendly.com/caroline-stephenson" pageSettings={{
									backgroundColor: 'ffffff',
									hideEventTypeDetails: true,
									hideLandingPageDetails: false,
									primaryColor: '00a2ff',
									textColor: '4d5055',
									hideGdprBanner:true
								}} prefill={{
									email: locatorDetails.emailAddress,
									firstName: locatorDetails.firstName,
									lastName: locatorDetails.lastName,
									name: locatorDetails.firstName + ' ' + locatorDetails.lastName + ' (' + locatorDetails.serviceName + ')', customAnswers: {

										a2: locatorDetails.serviceName,
										a3: locatorDetails.phoneNumber
									}
								}} /></FadeIn></div>
					</>
				)}
				<div ref={endRef}></div>
			</ChatLog>
		</CallContainer>
	);
};

export default Locator;
