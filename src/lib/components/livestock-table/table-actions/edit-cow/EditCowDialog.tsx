import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowDialogModel } from "./edit-cow-dialog-model";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import EditCowForm from "./edit-cow-form/EditCowForm";
import { editCowFormVIInterface } from "@/lib/implementations/models/edit-cow-form";

const EditCowDialog = function ({ model }) {
	const { interact, modelView } = model;
	const { shown, locations, cowModel } = modelView!;
	const { name, tag, type, location, dob } = cowModel!.modelView;
	const editCowFormModel = useInitializedStatefulInteractiveModel(
		editCowFormVIInterface(),
		{
			name,
			type,
			tag,
			dob,
			locations,
			selectedLocation: location,
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
				<Modal.Title>Edit Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<EditCowForm
					model={{
						...editCowFormModel,
						modelView: {
							...editCowFormModel.modelView!,
						},
					}}
				/>
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
						interact({
							type: "Submit",
							input: {
								currentDialogModelView: modelView!,
								currentFormModelView:
									editCowFormModel.modelView!,
							},
						})
					}
				>
					Update Cow
				</Button>
			</Modal.Footer>
		</Modal>
	);
} as ModeledVoidComponent<AddCowDialogModel>;

export default EditCowDialog;
