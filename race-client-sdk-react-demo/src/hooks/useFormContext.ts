import { useContext } from "react";
import { FormContext, FormContextType } from "../components/FormProvider/FormProvider";

export const useFormContext = (): FormContextType => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("[RACE SDK] useFormContext must be used within a FormProvider");
	}
	return context;
}