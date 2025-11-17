import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowDialogModel } from "./add-cow-dialog-model";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import { addCowFormVIInterface } from "@/lib/implementations/models/add-cow-form";
import AddCowForm from "./add-cow-form/AddCowForm";

const AddCowDialog = function ({ model }) {
	const { interact, modelView } = model;
	const { shown, cattleRepositoryModel } = modelView!;
	const addCowFormModel = useInitializedStatefulInteractiveModel(
		addCowFormVIInterface(cattleRepositoryModel),
		{
			name: "",
			type: "",
			tag: "",
			dob: new Date(),
			locationName: "",
		},
	);

	return (
		<Modal
			show={shown}
			onHide={() =>
				interact({
					type: "Toggle_Dialog",
					input: { currentDialogModelView: modelView! },
				})
			}
		>
			<Modal.Header closeButton>
				<Modal.Title>Add Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddCowForm model={addCowFormModel} />
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() =>
						interact({
							type: "Toggle_Dialog",
							input: { currentDialogModelView: modelView! },
						})
					}
				>
					Close
				</Button>
				<Button
					variant="primary"
					onClick={() =>
						addCowFormModel.interact({
							type: "Submit_Form",
							input: {
								currentFormModelView:
									addCowFormModel.modelView!,
							},
						})
					}
				>
					Add Cow
				</Button>
			</Modal.Footer>
		</Modal>
	);
} as ModeledVoidComponent<AddCowDialogModel>;

export default AddCowDialog;
