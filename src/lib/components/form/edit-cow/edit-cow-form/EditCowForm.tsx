import { ModeledVoidComponent } from "@mvc-react/components";
import { EditCowFormModel } from "./edit-cow-form-model";
import Form from "react-bootstrap/Form";

const EditCowForm = function ({ model }) {
	const { interact, modelView } = model;
	const { name, dob, type, tag, selectedLocation, locations, cowTypes } =
		modelView;
	const locationsMap = new Map<string, string>(
		locations.map(location => [location.name, location.id]),
	);
	const maxDate = Intl.DateTimeFormat("sv-SE").format(new Date());

	return (
		<div>
			<Form.Control
				type="text"
				defaultValue={name}
				placeholder="Name"
				required
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
				defaultValue={tag}
				placeholder="Tag"
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
				onChange={event =>
					interact({
						type: "UPDATE_FORM",
						input: {
							updatedFormModelView: {
								...modelView,
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
						type: "UPDATE_FORM",
						input: {
							updatedFormModelView: {
								...modelView,
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
		</div>
	);
} as ModeledVoidComponent<EditCowFormModel>;

export default EditCowForm;
