import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowDialogModel } from "./edit-cow-dialog-model";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import EditCowForm from "./edit-cow-form/EditCowForm";
import { editCowFormVIInterface } from "@/lib/implementations/models/edit-cow-form";
import Form from "react-bootstrap/Form";
import { newReadonlyModel } from "@mvc-react/mvc";

const EditCowDialog = function ({ model }) {
	const { interact, modelView } = model;
	const { shown, locations, cowModel } = modelView!;
	const { id, name, tag, type, location, dob } = cowModel!.modelView;
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
				<Form
					className="flex flex-col gap-4"
					onSubmit={e => {
						e.preventDefault();
						const {
							name: updatedName,
							selectedLocation,
							tag: updatedTag,
							type: updatedType,
							dob: updatedDob,
						} = editCowFormModel.modelView!;
						const updatedCow = newReadonlyModel({
							id,
							name: updatedName.trim(),
							dob: updatedDob,
							type: updatedType.trim(),
							tag: updatedTag.trim(),
							location: selectedLocation,
						});
						interact({
							type: "Submit",
							input: {
								currentDialogModelView: modelView!,
								updatedCow: updatedCow,
							},
						});
					}}
				>
					<EditCowForm
						model={{
							...editCowFormModel,
							modelView: {
								...editCowFormModel.modelView!,
							},
						}}
					/>
					<div className="flex gap-2 justify-end">
						<Button
							variant="secondary"
							onClick={() =>
								interact({
									type: "Toggle_Dialog",
									input: {
										currentDialogModelView: modelView!,
									},
								})
							}
						>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Update Cow
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
} as ModeledVoidComponent<AddCowDialogModel>;

export default EditCowDialog;
