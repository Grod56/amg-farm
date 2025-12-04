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
	const { shown, location, cowTypes, allLocations } = modelView;
	const addCowForm = useInitializedStatefulInteractiveModel(
		addCowFormVIInterface(),
		{
			name: "",
			type: cowTypes[0].type,
			tag: "",
			dob: new Date(),
			location,
			cowTypes,
			allLocations,
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
				<Modal.Title>Add Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form
					className="flex flex-col gap-4"
					onSubmit={e => {
						e.preventDefault();
						const { name, type, tag, dob, location } =
							addCowForm.modelView;
						interact({
							type: "SUBMIT",
							input: {
								cowToBeAdded: {
									name: name.trim(),
									dob,
									type,
									tag: tag.trim(),
									location,
								},
							},
						});
					}}
				>
					<AddCowForm model={addCowForm} />
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
							Add Cow
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
} as ModeledVoidComponent<AddCowDialogModel>;

export default AddCowDialog;
