import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowFormModel } from "./add-cow-form-model";
import Form from "react-bootstrap/Form";

const AddCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { name, dob, tag, location, cowTypes } = modelView;
	const maxDate = Intl.DateTimeFormat("sv-SE").format(new Date());

	return (
		<div>
			<Form.Control
				type="text"
				placeholder="Name"
				required
				defaultValue={name}
				onChange={e =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView,
								name: e.target.value,
							},
						},
					})
				}
			/>
			<br />
			<Form.Select
				required
				defaultValue={cowTypes[0].type}
				onChange={e =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView,
								type: e.target.value,
							},
						},
					})
				}
			>
				{[
					...cowTypes.map((cowType, index) => (
						<option key={index}>{cowType.type}</option>
					)),
				]}
			</Form.Select>
			<br />
			<Form.Control
				type="text"
				placeholder="Tag"
				defaultValue={tag}
				onChange={e =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView,
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
				defaultValue={Intl.DateTimeFormat("sv-SE").format(dob)} // TODO: eww...
				max={maxDate}
				onChange={e =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView,
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
				defaultValue={location.name}
				disabled
			/>
		</div>
	);
} as ModeledVoidComponent<AddCowFormModel>;

export default AddCowForm;
