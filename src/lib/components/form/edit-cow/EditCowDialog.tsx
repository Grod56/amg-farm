import { editCowFormVIInterface } from "@/lib/implementations/models/edit-cow-form";
import { ModeledVoidComponent } from "@mvc-react/components";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { EditCowDialogModel } from "./edit-cow-dialog-model";
import EditCowForm from "./edit-cow-form/EditCowForm";

const EditCowDialog = function ({ model }) {
	const { interact, modelView } = model;
	const { shown, locations, cowToBeEdited, cowTypes, formTools } = modelView;
	const { name, tag, type, location, dob } = cowToBeEdited.modelView;
	const { modelView: formModelView, interact: formModelInteract } =
		useInitializedStatefulInteractiveModel(
			editCowFormVIInterface({
				...formTools,
				successCallback(cow) {
					interact({ type: "CLOSE" });
					formTools.successCallback?.(cow);
				},
			}),
			{
				cowToBeEdited,
				fields: { name, type, tag, dob, location },
				locations,
				cowTypes,
			},
		);
	const [exited, setExited] = useState(false);
	const [updateScheduled, setUpdateScheduled] = useState(false);
	const [updated, setUpdated] = useState(true);
	const formMatches = useCallback(() => {
		const {
			name: formName,
			type: formType,
			tag: formTag,
			location: formLocation,
			dob: formDob,
		} = formModelView.fields;
		return (
			name == formName &&
			type == formType &&
			location.id == formLocation.id &&
			tag == formTag &&
			dob == formDob
		);
	}, [dob, formModelView, location, name, tag, type]);

	useLayoutEffect(() => {
		if (shown && !(updated || updateScheduled)) {
			formModelInteract({
				type: "UPDATE_FORM",
				input: {
					updatedFormFields: {
						name,
						dob,
						type,
						tag,
						location,
					},
				},
			});
			setUpdateScheduled(true);
		}
	}, [
		updated,
		updateScheduled,
		cowTypes,
		formModelInteract,
		dob,
		shown,
		location,
		locations,
		name,
		tag,
		type,
	]);

	useLayoutEffect(() => {
		if (updateScheduled && formMatches()) {
			setUpdated(true);
			setUpdateScheduled(false);
		}
	}, [updateScheduled, formModelView, formMatches]);

	useEffect(() => {
		if (exited && !formMatches()) {
			formModelInteract({
				type: "UPDATE_FORM",
				input: {
					updatedFormFields: {
						name,
						dob,
						type,
						tag,
						location,
					},
				},
			});
		}
	}, [
		dob,
		exited,
		formMatches,
		formModelInteract,
		location,
		name,
		tag,
		type,
	]);

	useEffect(() => {
		if (shown) {
			setExited(false);
		}
	}, [shown]);

	return (
		<Modal
			show={shown}
			onHide={() =>
				interact({
					type: "CLOSE",
				})
			}
			onExited={() => {
				setExited(true);
				setUpdated(false);
			}}
		>
			<Modal.Header
				className="bg-gray-700 text-white"
				closeButton
				closeVariant="white"
			>
				<Modal.Title>Edit Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{!exited && updated && (
					<EditCowForm
						model={{
							modelView: { ...formModelView, cowToBeEdited },
							interact: formModelInteract,
						}}
					/>
				)}
			</Modal.Body>
		</Modal>
	);
} as ModeledVoidComponent<EditCowDialogModel>;

export default EditCowDialog;
