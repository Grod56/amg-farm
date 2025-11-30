import { ModeledVoidComponent } from "@mvc-react/components";
import { AddCowFormModel } from "./add-cow-form-model";
import Form from "react-bootstrap/Form";

const AddCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { name, dob, tag, type, location, allLocations, cowTypes } =
		modelView;
	const maxDate = Intl.DateTimeFormat("sv-SE").format(new Date());
	const locationsMap = new Map<string, string>(
		allLocations.map(location => [location.name, location.id]),
	);

	return (
		<div>
			<Form.Control
				type="text"
				placeholder="Name"
				required
				defaultValue={name}
				onChange={e =>
					interact({
						type: "UPDATE_FORM",
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
				defaultValue={type}
				required
				onChange={e =>
					interact({
						type: "UPDATE_FORM",
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
						type: "UPDATE_FORM",
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
						type: "UPDATE_FORM",
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
			<Form.Select
				required
				defaultValue={location.name}
				onChange={event =>
					interact({
						type: "UPDATE_FORM",
						input: {
							updatedFormModelView: {
								...modelView,
								location: {
									id: locationsMap.get(event.target.value)!,
									name: event.target.value,
								},
							},
						},
					})
				}
			>
				{[
					...allLocations.map(location => (
						<option key={location.id}>{location.name}</option>
					)),
				]}
			</Form.Select>
		</div>
	);
} as ModeledVoidComponent<AddCowFormModel>;

export default AddCowForm;
