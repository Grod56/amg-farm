import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowFormModel } from "./add-cow-form-model";
import Form from "react-bootstrap/Form";

const AddCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { name, dob, tag, type, location } = modelView!;

	return (
		<div>
			<Form.Control
				type="text"
				placeholder="Name"
				required
				value={name}
				onChange={e =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView!,
								name: e.target.value,
							},
						},
					})
				}
			/>
			<br />
			<Form.Control
				type="text"
				placeholder="Type"
				required
				value={type}
				onChange={e =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView!,
								type: e.target.value,
							},
						},
					})
				}
			/>
			<br />
			<Form.Control
				type="text"
				placeholder="Tag"
				value={tag}
				onChange={e =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView!,
								tag: e.target.value,
							},
						},
					})
				}
			/>
			<br />
			<Form.Control
				type="date"
				placeholder="Date of Birth"
				required
				value={Intl.DateTimeFormat("sv-SE").format(dob)} // TODO: eww...
				onChange={e =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView!,
								dob: new Date(e.target.value),
							},
						},
					})
				}
			/>
			<br />
			<Form.Control
				type="text"
				placeholder="Location"
				required
				value={location.name}
				disabled
			/>
		</div>
	);
} as ModeledVoidComponent<AddCowFormModel>;

export default AddCowForm;
