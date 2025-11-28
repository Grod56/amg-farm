import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowDialogModel } from "./add-cow-dialog-model";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import { addCowFormVIInterface } from "@/lib/implementations/models/add-cow-form";
import AddCowForm from "./add-cow-form/AddCowForm";
import Form from "react-bootstrap/Form";

const AddCowDialog = function ({ model }) {
	const { interact, modelView } = model;
	const { shown, location } = modelView;
	const addCowFormModel = useInitializedStatefulInteractiveModel(
		addCowFormVIInterface(),
		{
			name: "",
			type: "",
			tag: "",
			dob: new Date(),
			location,
		},
	);

	return (
		<Modal
			show={shown}
			onHide={() =>
				interact({
					type: "Toggle_Dialog",
					input: { currentDialogModelView: modelView },
				})
			}
		>
			<Modal.Header closeButton>
				<Modal.Title>Add Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					className="flex flex-col gap-4"
					onSubmit={e => {
						e.preventDefault();
						const { name, type, tag, dob } =
							addCowFormModel.modelView;
						interact({
							type: "Submit",
							input: {
								currentDialogModelView: modelView,
								currentFormModelView: {
									name: name.trim(),
									dob,
									type: type.trim(),
									tag: tag.trim(),
									location,
								},
							},
						});
					}}
				>
					<AddCowForm model={addCowFormModel} />
					<div className="flex gap-2 justify-end">
						<Button
							variant="secondary"
							onClick={() =>
								interact({
									type: "Toggle_Dialog",
									input: {
										currentDialogModelView: modelView,
									},
								})
							}
						>
							Close
						</Button>
						<Button type="submit" variant="primary">
							Add Cow
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
} as ModeledVoidComponent<AddCowDialogModel>;

export default AddCowDialog;
