import { ModeledVoidComponent } from "@mvc-react/components";
import { TableActionsModel } from "./table-actions-model";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const TableActions = function ({ model }) {
	const { interact, modelView } = model;
	const { locations, selectedLocation, selectedCow } = modelView!;

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
				<button className="add">
					<FontAwesomeIcon icon={faAdd} />
				</button>
				<button
					className="remove disabled:opacity-60 disabled:cursor-default cursor-pointer"
					disabled={Boolean(!selectedCow)}
				>
					<FontAwesomeIcon icon={faTrashCan} />
				</button>
				<button
					className="edit disabled:opacity-60 disabled:cursor-default cursor-pointer"
					disabled={Boolean(!selectedCow)}
				>
					<FontAwesomeIcon icon={faEdit} />
				</button>
			</div>
		</div>
	);
} as ModeledVoidComponent<TableActionsModel>;

export default TableActions;
