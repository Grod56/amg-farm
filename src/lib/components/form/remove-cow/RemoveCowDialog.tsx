import { ModeledVoidComponent } from "@mvc-react/components";
import { RemoveCowDialogModel } from "./remove-cow-dialog-model";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

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
			<Modal.Header className="bg-gray-700 text-white">
				<Modal.Title>Remove Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{`Are you sure you want to remove "${cow.modelView.name}"?`}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() =>
						interact({
							type: "CLOSE",
						})
					}
				>
					Close
				</Button>
				<Button
					className="bg-gray-800! hover:bg-gray-900! text-white border-none!"
					type="submit"
					onClick={() =>
						interact({
							type: "SUBMIT",
						})
					}
				>
					Remove
				</Button>
			</Modal.Footer>
		</Modal>
	);
} as ModeledVoidComponent<RemoveCowDialogModel>;

export default RemoveCowDialog;
