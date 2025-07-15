import { ModeledVoidComponent } from "@mvc-react/components";
import { FooterModel } from "./footer-model";

const Footer = function ({ model }) {
	const { copyrightText } = model.modelView;

	return (
		<div className="py-6 px-8 bg-white text-center self-baseline w-full">
			<span className="text-sm text-black">{copyrightText}</span>
		</div>
	);
} as ModeledVoidComponent<FooterModel>;

export default Footer;
