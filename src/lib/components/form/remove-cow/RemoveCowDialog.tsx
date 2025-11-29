import { ModeledVoidComponent } from "@mvc-react/components";
import { RemoveCowDialogModel } from "./remove-cow-dialog-model";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

const RemoveCowDialog = function ({ model }) {
	const { modelView, interact } = model;
	const { cowModel, shown } = modelView;

	return (
		<Modal
			show={shown}
			onHide={() =>
				interact({
					type: "TOGGLE_DIALOG",
					input: { currentDialogModelView: modelView },
				})
			}
		>
			<Modal.Header className="bg-gray-700 text-white">
				<Modal.Title>Remove Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>{`Are you sure you want to remove "${cowModel?.modelView.name}"?`}</p>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() =>
						interact({
							type: "TOGGLE_DIALOG",
							input: { currentDialogModelView: modelView },
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
							type: "REMOVE_COW",
							input: {
								currentDialogModelView: modelView,
							},
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
