/* eslint-disable @typescript-eslint/no-unused-vars */
/* global RaceSDK */
/* global console */
/* global document */
/* global ACCOUNT_SID */
/* global FORM_ID */

function FormInit() {
	const form = new RaceSDK.Form({ accountSid: ACCOUNT_SID, formId: FORM_ID });

	form.on("form#ready", () => {
		console.log("Form ready");
		form.init({
			formContainer: document.getElementById("form"),
			theme: {
				maxWidth: "800px"
			}
		})
	});
}
