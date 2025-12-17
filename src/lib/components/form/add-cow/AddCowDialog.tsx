import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowDialogModel } from "./add-cow-dialog-model";
import Modal from "react-bootstrap/Modal";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import { addCowFormVIInterface } from "@/lib/implementations/models/add-cow-form";
import AddCowForm from "./add-cow-form/AddCowForm";
import { useEffect, useLayoutEffect, useState } from "react";

const AddCowDialog = function ({ model }) {
	const { interact, modelView } = model;
	const { shown, initialFormModelView, formTools } = modelView;
	const [exited, setExited] = useState(false);
	const [updateScheduled, setUpdateScheduled] = useState(false);
	const [updated, setUpdated] = useState(true);

	const { modelView: formModelView, interact: formModelInteract } =
		useInitializedStatefulInteractiveModel(
			addCowFormVIInterface({
				...formTools,
				async successCallback(cow) {
					await interact({ type: "CLOSE" });
					await formTools.successCallback?.(cow);
				},
			}),
			{ ...initialFormModelView },
		);

	useLayoutEffect(() => {
		if (
			shown &&
			JSON.stringify(formModelView.fields) !=
				JSON.stringify(initialFormModelView.fields) &&
			!(updated || updateScheduled)
		) {
			formModelInteract({
				type: "UPDATE_FORM",
				input: { updatedFormFields: initialFormModelView.fields },
			});
			setUpdateScheduled(true);
		}
	}, [
		formModelInteract,
		formModelView.fields,
		initialFormModelView.fields,
		updateScheduled,
		updated,
		shown,
	]);

	useLayoutEffect(() => {
		if (
			updateScheduled &&
			JSON.stringify(formModelView.fields) ==
				JSON.stringify(initialFormModelView.fields)
		) {
			setUpdated(true);
			setUpdateScheduled(false);
		}
	}, [formModelView.fields, initialFormModelView.fields, updateScheduled]);

	useEffect(() => {
		if (
			exited &&
			JSON.stringify(formModelView.fields) !=
				JSON.stringify(initialFormModelView.fields)
		) {
			formModelInteract({
				type: "UPDATE_FORM",
				input: { updatedFormFields: initialFormModelView.fields },
			});
		}
	}, [
		formModelInteract,
		exited,
		formModelView.fields,
		initialFormModelView.fields,
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
				<Modal.Title>Add Cow</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{!exited && updated && (
					<AddCowForm
						model={{
							modelView: formModelView,
							interact: formModelInteract,
						}}
					/>
				)}
			</Modal.Body>
		</Modal>
	);
} as ModeledVoidComponent<AddCowDialogModel>;

export default AddCowDialog;
