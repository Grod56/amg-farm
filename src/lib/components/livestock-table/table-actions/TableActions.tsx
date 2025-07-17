import { ModeledVoidComponent } from "@mvc-react/components";
import { TableActionsModel } from "./table-actions-model";

const TableActions = function ({ model }) {
	const { interact, modelView } = model;
	const { locations, selectedLocation } = modelView!;

	return (
		<div className="flex gap-7 justify-between w-full">
			<select
				name="locations"
				id="location-selector"
				defaultValue={selectedLocation}
				onChange={event =>
					interact({
						type: "Change_Location",
						input: { location: event.target.value },
					})
				}
			>
				{locations.map(location => (
					<option key={location} value={location}>
						{location}
					</option>
				))}
			</select>
			<div className="flex gap-4">
				<button className="add">+</button>
				<button className="remove">x</button>
				<button className="edit">Edit</button>
			</div>
		</div>
	);
} as ModeledVoidComponent<TableActionsModel>;

export default TableActions;
