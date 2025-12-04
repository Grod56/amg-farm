import { ModeledVoidComponent } from "@mvc-react/components";
import { EditCowDialogModel } from "./edit-cow-dialog-model";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import EditCowForm from "./edit-cow-form/EditCowForm";
import { editCowFormVIInterface } from "@/lib/implementations/models/edit-cow-form";
import Form from "react-bootstrap/Form";
import { newReadonlyModel } from "@mvc-react/mvc";

const EditCowDialog = function ({ model }) {
	const { interact, modelView } = model;
	const { shown, locations, cow, cowTypes } = modelView;
	const { id, name, tag, type, location, dob } = cow.modelView;
	const editFormModel = useInitializedStatefulInteractiveModel(
		editCowFormVIInterface(),
		{
			name,
			type,
			tag,
			dob,
			locations,
			location,
			cowTypes,
		},
	);

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
				<Modal.Title>Edit Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					className="flex flex-col gap-4"
					onSubmit={e => {
						e.preventDefault();
						const {
							name: updatedName,
							location: updatedLocation,
							tag: updatedTag,
							type: updatedType,
							dob: updatedDob,
						} = editFormModel.modelView;
						const updatedCow = newReadonlyModel({
							id,
							name: updatedName.trim(),
							dob: updatedDob,
							type: updatedType.trim(),
							tag: updatedTag.trim(),
							location: updatedLocation,
						});
						interact({
							type: "SUBMIT",
							input: {
								updatedCow: updatedCow,
							},
						});
					}}
				>
					<EditCowForm
						model={{
							modelView: editFormModel.modelView,
							interact: editFormModel.interact,
						}}
					/>
					<div className="flex gap-2 justify-end">
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
						>
							Update Cow
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
} as ModeledVoidComponent<EditCowDialogModel>;

export default EditCowDialog;
