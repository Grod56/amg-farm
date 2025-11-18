import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowFormModel } from "./add-cow-form-model";
import Form from "react-bootstrap/Form";

const AddCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { name, dob, tag, type, location } = modelView!;

	return (
		<Form>
			<Form.Control
				type="text"
				placeholder="Name"
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
				value={location.name}
				disabled
			/>
		</Form>
	);
} as ModeledVoidComponent<AddCowFormModel>;

export default AddCowForm;
