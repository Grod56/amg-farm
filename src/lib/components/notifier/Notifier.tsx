import { ModeledVoidComponent } from "@mvc-react/components";
import { NotifierModel, Variant } from "./notifier-model";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Notifier = function ({ model }) {
	const { modelView, interact } = model;
	const { shown, text, variant } = modelView!;
	const variantMap = new Map<Variant, string>([
		["success", "success"],
		["failure", "danger"],
	]);

	return (
		<ToastContainer
			position={"bottom-center"}
			className="p-4 position-fixed"
			style={{ zIndex: 10 }}
		>
			<Toast
				bg={variantMap.get(variant)}
				show={shown}
				onClose={() =>
					interact({
						type: "Close",
						input: { currentModelView: modelView! },
					})
				}
				delay={5000}
				autohide
			>
				<Toast.Body className="text-center">
					<span className="text-amber-50 text-base">{text}</span>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
} as ModeledVoidComponent<NotifierModel>;

export default Notifier;
