import { Anchor, Box, Button, FilePicker, FilePickerButton, HelpText, Input, Label, Toaster, useToaster, Select, Option } from "@twilio-paste/core";
import { FC, useState } from "react";
import { APIKEY } from "src/constants";
import { useConfigContext } from "src/hooks/useConfigContext";
import { HideIcon } from "@twilio-paste/icons/esm/HideIcon";
import { ShowIcon } from "@twilio-paste/icons/esm/ShowIcon";


export const IframeLoader: FC = () => {

	const toaster = useToaster();
	const [url, setUrl] = useState<string>("");
	const [visible, setVisible] = useState<boolean>(true);
	const [logoUrl, setLogoUrlState] = useState<string>("");
	const [apiKey] = useState<string>(APIKEY || "");
	const [img, setImg] = useState<string>("");
	const { setLogoUrl } = useConfigContext();

	const handleChange = (e: any) => {
		setUrl(e.target.value);
	}

	const handleLogoChange = (e: any) => {
		setLogoUrlState(e.target.value);
	}

	const isValidUrl = (string: string) => {
		try {
			new URL(string);
		} catch (_) {
			return false;
		}
		return true;
	}

	const handleFileChange = (e: any) => {
		const url = URL.createObjectURL(e.target.files[0]);
		setImg(url);
	}

	const handleURL = () => {
		if (isValidUrl(url)) {
			fetch("https://urlscan.io/api/v1/scan/", {
				method: "POST",
				headers: {
					"API-Key": apiKey,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					url: url,
					visibility: "public"
				})
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setImg(`https://urlscan.io/screenshots/${data.uuid}.png`);
					console.log(img);
					toaster.push({
						message: "Data sent successfully",
						variant: "success",
						dismissAfter: 5000
					});
				})
				.catch((err) => {
					console.log(err);
					toaster.push({
						message: "Something went wrong",
						variant: "error",
						dismissAfter: 5000
					});
				});
		} else {
			toaster.push({
				message: "Please enter a valid url",
				variant: "error",
				dismissAfter: 5000
			});
		}
	};


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
					.setAttribute("height", "1300px");
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
					.setAttribute("height", "1300px");
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

	const handleLogoSubmit = () => {
		if (isValidUrl(logoUrl)) {
			setLogoUrl(logoUrl);
			toaster.push({
				message: "Logo set successfully",
				variant: "success",
				dismissAfter: 5000
			})
		} else {
			toaster.push({
				message: "Logo URL should start with https://",
				variant: "error",
				dismissAfter: 5000
			})
		}
	}

	const setInvisible = () => {
		setVisible(false)
	}

	const setVisibility = () => {
		setVisible(true)
	}

	const clearFunction = () => {
		const iframeOld = document.getElementById("iframe");
		setUrl("");
		setImg("");
		if (iframeOld) {
			iframeOld.remove();
		}
	}


	return (
		<>{!visible && <Box display="flex" justifyContent="end" backgroundColor="colorBackgroundDecorative10Weakest" alignItems="center" padding="space20" rowGap="space50" borderBottomStyle="solid" borderBottomWidth="borderWidth20" columnGap="space50" width="100%" flexWrap="wrap" visibility={visible ? "hidden" : "visible"}>
<img src="https://ciptex.com/wp-content/uploads/2022/05/ciptex-logo.3e8e009e.svg" height = "30px"/>
		<Button variant="secondary" size="icon" onClick={setVisibility} hidden = {!visible} >
			Show Demo Config <ShowIcon decorative={false} title="Description of icon" />
		</Button>
	</Box>}

			<Box padding="space60" backgroundColor="colorBackgroundDecorative10Weakest" borderBottomStyle="solid" borderBottomWidth="borderWidth20" visibility={visible ? "visible" : "hidden"}>
				<Box display="flex" justifyContent="end" alignItems="center" rowGap="space50" columnGap="space50" width="100%" flexWrap="wrap" >

					<Button variant="secondary" size="icon" onClick={setInvisible}>
						Hide Demo Config <HideIcon decorative={false} title="Description of icon" />
					</Button>
				</Box>

				<Label htmlFor="url" required>Website URL to Preview</Label>
				<Box display="flex" justifyContent="start" alignItems="center" rowGap="space50" columnGap="space50" width="100%" flexWrap="wrap">
					<Box display="flex" alignItems="center" columnGap="space50" width="size50">
						<Input aria-describedby="url" id="url" name="url" type="text" placeholder="https://ciptex.com" onChange={handleChange} required />
					</Box>
					<Box display="flex" alignItems="center" columnGap="space50" width="size50">
						<Button variant="secondary" onClick={handleSubmit}>Iframe</Button>
                    or
						{/* <Button variant="secondary" disabled onClick={handleURL}>Image</Button> or */}
						<FilePicker accept="image/*" onChange={handleFileChange}>
							<FilePickerButton variant="secondary">Upload a file</FilePickerButton>
						</FilePicker>
						<Button variant="secondary" onClick={clearFunction}>Clear</Button>
					</Box>

				</Box>
				<HelpText id="url" >* Please make sure the website you are trying to view allows iframe loading. <Anchor href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options" target="_blank">Learn more here</Anchor>.</HelpText>
				<Box display="flex" justifyContent="start" alignItems="center" rowGap="space50" columnGap="space50" width="100%" flexWrap="wrap" marginTop="space50"></Box>
				<Label htmlFor="logoUrl" required>Widget Logo URL</Label>
				<Box display="flex" justifyContent="start" alignItems="center" rowGap="space0" columnGap="space50" width="100%" flexWrap="wrap" >
					<Box display="flex" alignItems="center" columnGap="space50" width="size40">
						<Input aria-describedby="url" id="logoUrl" name="logoUrl" type="text" placeholder="https://ciptex.com/logo.png" onChange={handleLogoChange} required />
					</Box>
					<Box display="flex" alignItems="center" columnGap="space50" width="size40">
						<Button variant="secondary" onClick={handleLogoSubmit}>Set Widget Logo</Button>
					</Box></Box>
				{/*<Box display="flex" justifyContent="start" alignItems="center" rowGap="space50" columnGap="space50" width="100%" flexWrap="wrap" marginTop="space50"></Box>
				<Label htmlFor="logoUrl" required>Voice Config</Label>
				<Box display="flex" justifyContent="start" alignItems="center" rowGap="space0" columnGap="space50" width="100%" flexWrap="wrap" >
					<Box display="flex" alignItems="center" columnGap="space50" width="size40">
						<Select id="author">
							<Option value="bee-housing">Bee Housing</Option>
							<Option value="hubspot">Hubspot</Option>
							<Option value="generic">Generic</Option>
						</Select>
					</Box>
					<Box display="flex" alignItems="center" columnGap="space50" width="size40">
						<Button variant="secondary" onClick={handleLogoSubmit}>Set Demo Config</Button>
	</Box></Box>*/}
			</Box>
			<Box id="iframe_container" height="auto">
				{img && <img id="imageid" src={img} alt="screenshot" width="100%" height="100%" />}
			</Box>
			<Toaster {...toaster} />
		</>
	)
}