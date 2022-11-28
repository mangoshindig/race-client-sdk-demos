import { Anchor, Box, Button, HelpText, Input, Label, Toaster, useToaster } from "@twilio-paste/core";
import {  FC, useState } from "react";


export const IframeLoader: FC = () => {

	const toaster = useToaster();
	const [url, setUrl] = useState<string>("");

	const handleChange = (e: any) => {
		setUrl(e.target.value);
	}

	// create a function to check url is valid or not
	const isValidUrl = (string: string) => {
		try {
			new URL(string);
		} catch (_) {
			return false;
		}
		return true;
	}


	const handleSubmit = () => {
		if (isValidUrl(url)) {
			const iframeOld = document.getElementById("iframe");
			if (iframeOld) {
				iframeOld.remove();
				const iframe = document.createElement("iframe");
				iframe
					.setAttribute("src", url);
				iframe
					.setAttribute("frameborder", "0");
				iframe
					.setAttribute("allowfullscreen", "true");
				iframe
					.setAttribute("width", "100%");
				iframe
					.setAttribute("height", "100%");
				iframe
					.setAttribute("id", "iframe");
				const iframeContainer = document.getElementById("iframe_container");
				if (iframeContainer) {
					iframeContainer
						.appendChild(iframe);
				}
			}
			else {
				const iframe = document.createElement("iframe");
				iframe
					.setAttribute("src", url);
				iframe
					.setAttribute("frameborder", "0");
				iframe
					.setAttribute("allowfullscreen", "true");
				iframe
					.setAttribute("width", "100%");
				iframe
					.setAttribute("height", "100%");
				iframe
					.setAttribute("id", "iframe");
				const iframeContainer = document.getElementById("iframe_container");
				if (iframeContainer) {
					iframeContainer
						.appendChild(iframe);
				}
			}
		} else {
			toaster.push({
				message: "URL should start with https://",
				variant: "error",
				dismissAfter: 5000
			})
		}
	}



	return (
		<>
			<Box padding="space60" backgroundColor="colorBackgroundDecorative10Weakest" borderBottomStyle="solid" borderBottomWidth="borderWidth20">
				<Label htmlFor="url" required>Website URL to Preview</Label>
				<Box display="flex" justifyContent="space-between" columnGap="space60" width="size60">
					<Input aria-describedby="url" id="url" name="url" type="text" placeholder="https://ciptex.com" onChange={handleChange} required/>
					<Button variant="primary" type="submit" onClick={handleSubmit}>View</Button>
				</Box>
				<HelpText id="url">* Please make sure the website you are trying to view allows iframe loading. <Anchor href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options" target="_blank">Learn more here</Anchor>.</HelpText>
			</Box>
			<Box id="iframe_container" height="2000px"></Box>
			<Toaster {...toaster} />
		</>
	)
}