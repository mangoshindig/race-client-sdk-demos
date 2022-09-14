import { Context, createContext, FC, useCallback, useEffect, useState } from "react";
import { Form } from "@ciptex/race-client-sdk";
import { ReactElementProps } from "../../interface";
import { ACCOUNT_SID, FORM_ID } from "../../constants";

export type FormContextType = {
	init: () => void;
	formContainer: (node: HTMLDivElement) => void;
};

export const FormContext: Context<FormContextType> = createContext<FormContextType>(null!);

export const FormProvider: FC<ReactElementProps> = ({ children }: ReactElementProps) => {
	const [form, setForm] = useState<Form>();
	const [localformContainer, setLocalFormContainer] = useState<HTMLDivElement>();
	const [isReady, setIsReady] = useState<boolean>(false);

	const formContainer = useCallback((node: HTMLDivElement | null) => {
		if (node && node !== null) {
			setLocalFormContainer(node);
		}
	}, []);

	useEffect(() => {
		if (form && isReady && localformContainer) {
			form.init({
				formContainer: localformContainer,
				theme: {
					maxWidth: "800px"
				}
			});
		}
	}, [isReady, form, formContainer]);

	const init = async () => {
		try {
			if (!ACCOUNT_SID || !FORM_ID) {
				throw new Error("Missing ACCOUNT_SID or FORM_ID Variables");
			}

			const v = new Form({
				accountSid: ACCOUNT_SID,
				formId: FORM_ID
			});

			v.on("form#ready", () => {
				console.info("[Client] form#ready recieved");
				setForm(v);
				setIsReady(true);
			});
		} catch (error) {
			console.error("[Client] ", error);
		}
	}

	return (<FormContext.Provider value={{ init, formContainer }}>{children}</FormContext.Provider>);
}