import { ModeledVoidComponent } from "@mvc-react/components";
import Modal from "react-bootstrap/esm/Modal";
import { RemoveCowDialogModel } from "./remove-cow-dialog-model";

const RemoveCowDialog = function ({ model }) {
	const { modelView, interact } = model;
	const { cow, shown } = modelView;

	return (
		<Modal
			show={shown}
			onHide={() =>
				interact({
					type: "CLOSE",
				})
			}
		>
			<Modal.Header
				className="bg-gray-700 text-white"
				closeButton
				closeVariant="white"
			>
				<Modal.Title>Remove Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{`Are you sure you want to remove "${cow.modelView.name}"?`}</p>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="flex w-1/3 p-2 items-center justify-center gap-2 rounded-lg! text-white bg-gray-700 disabled:bg-gray-400 hover:bg-gray-800"
					type="submit"
					onClick={() => {
						interact({ type: "SUBMIT" });
					}}
				>
					Remove
				</button>
			</Modal.Footer>
		</Modal>
	);
} as ModeledVoidComponent<RemoveCowDialogModel>;

export default RemoveCowDialog;
