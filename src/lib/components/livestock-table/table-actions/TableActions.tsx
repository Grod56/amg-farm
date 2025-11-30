import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModeledVoidComponent } from "@mvc-react/components";
import { TableActionsModel } from "./table-actions-model";

const TableActions = function ({ model }) {
	const { interact, modelView } = model;
	const { locations, selectedLocation, selectedCow, isPending } = modelView;
	const locationsMap = new Map<string, string>(
		locations.map(location => [location.name, location.id]),
	);

	return (
		<div className="flex gap-7 justify-between w-full">
			<select
				className="focus-visible:outline-none"
				name="locations"
				id="location-selector"
				disabled={isPending}
				defaultValue={selectedLocation.name}
				onChange={event =>
					interact({
						type: "CHANGE_LOCATION",
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
			<div className="flex gap-4 pr-5">
				<button
					className="add disabled:text-gray-400 disabled:cursor-default cursor-pointer"
					title="Add Cow"
					disabled={isPending}
				>
					<FontAwesomeIcon
						icon={faAdd}
						onClick={() => interact({ type: "ADD" })}
					/>
				</button>
				<button
					className="remove text-red-800 disabled:text-gray-400 disabled:cursor-default cursor-pointer"
					hidden={!selectedCow}
					disabled={isPending}
					title="Remove"
				>
					<FontAwesomeIcon
						icon={faTrashCan}
						onClick={() => interact({ type: "REMOVE" })}
					/>
				</button>
				<button
					className="edit disabled:text-gray-400 disabled:cursor-default cursor-pointer"
					hidden={!selectedCow}
					title="Edit Cow"
					disabled={isPending}
				>
					<FontAwesomeIcon
						icon={faEdit}
						onClick={() => interact({ type: "EDIT" })}
					/>
				</button>
				<button
					className="edit disabled:text-gray-400 disabled:cursor-default cursor-pointer"
					hidden={!selectedCow}
					title="Cancel Selection"
					disabled={isPending}
				>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={() => interact({ type: "CLEAR_SELECTED" })}
					/>
				</button>
			</div>
		</div>
	);
} as ModeledVoidComponent<TableActionsModel>;

export default TableActions;
