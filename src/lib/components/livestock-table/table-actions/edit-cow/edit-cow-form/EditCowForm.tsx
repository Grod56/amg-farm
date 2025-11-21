import { ModeledVoidComponent } from "@mvc-react/components";
import { EditCowFormModel } from "./edit-cow-form-model";
import Form from "react-bootstrap/Form";

const EditCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { name, dob, tag, type, selectedLocation, locations } = modelView!;
	const locationsMap = new Map<string, string>(
		locations.map(location => [location.name, location.id]),
	);

	return (
		<Form>
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
				onChange={event =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView!,
								dob: new Date(event.target.value),
							},
						},
					})
				}
			/>
			<br />
			<Form.Select
				name="locations"
				id="edit-form-location-selector"
				defaultValue={selectedLocation.name}
				required
				onChange={event =>
					interact({
						type: "Update_Form",
						input: {
							updatedFormModelView: {
								...modelView!,
								selectedLocation: {
									id: locationsMap.get(event.target.value)!,
									name: event.target.value,
								},
							},
						},
					})
				}
			>
				{[
					...locationsMap
						.entries()
						.map(([location_name, location_id]) => (
							<option key={location_id} value={location_name}>
								{location_name}
							</option>
						)),
				]}
			</Form.Select>
		</Form>
	);
} as ModeledVoidComponent<EditCowFormModel>;

export default EditCowForm;
