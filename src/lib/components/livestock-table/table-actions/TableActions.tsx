import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModeledVoidComponent } from "@mvc-react/components";
import { TableActionsModel } from "./table-actions-model";

const TableActions = function ({ model }) {
	const { interact, modelView } = model;
	const { locations, selectedLocation, selectedCow } = modelView!;
	const locationsMap = new Map<string, string>(
		locations.map(location => [location.name, location.id]),
	);

	return (
		<div className="flex gap-7 justify-between w-full">
			<select
				name="locations"
				id="location-selector"
				defaultValue={selectedLocation.name}
				onChange={event =>
					interact({
						type: "Change_Location",
						input: {
							location: {
								name: event.target.value,
								id: locationsMap.get(event.target.value)!,
							},
						},
					})
				}
			>
				{[
					...locationsMap
						.entries()
						.map(([location_name, location_id]) => (
							<option
								className="text-sm"
								key={location_id}
								value={location_name}
							>
								{location_name}
							</option>
						)),
				]}
			</select>
			<div className="flex gap-4">
				<button className="add" title="Add">
					<FontAwesomeIcon
						icon={faAdd}
						onClick={() => interact({ type: "Add" })}
					/>
				</button>
				<button
					className="remove text-red-800 disabled:text-gray-400 disabled:cursor-default cursor-pointer"
					disabled={Boolean(!selectedCow)}
					title="Remove"
				>
					<FontAwesomeIcon
						icon={faTrashCan}
						onClick={() => interact({ type: "Remove" })}
					/>
				</button>
				<button
					className="edit disabled:text-gray-400 disabled:cursor-default cursor-pointer"
					disabled={Boolean(!selectedCow)}
					title="Edit"
				>
					<FontAwesomeIcon
						icon={faEdit}
						onClick={() => interact({ type: "Edit" })}
					/>
				</button>
			</div>
		</div>
	);
} as ModeledVoidComponent<TableActionsModel>;

export default TableActions;
