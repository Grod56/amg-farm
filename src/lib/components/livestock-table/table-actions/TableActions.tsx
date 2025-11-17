import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModeledVoidComponent } from "@mvc-react/components";
import { TableActionsModel } from "./table-actions-model";

const TableActions = function ({ model }) {
	const { interact, modelView } = model;
	const { locationNames, selectedLocationName, selectedCow } = modelView!;

	return (
		<div className="flex gap-7 justify-between w-full">
			<select
				name="locations"
				id="location-selector"
				defaultValue={selectedLocationName}
				onChange={event =>
					interact({
						type: "Change_Location",
						input: { locationName: event.target.value },
					})
				}
			>
				{locationNames.map(location => (
					<option key={location} value={location}>
						{location}
					</option>
				))}
			</select>
			<div className="flex gap-4">
				<button className="add">
					<FontAwesomeIcon
						icon={faAdd}
						onClick={() => interact({ type: "Add" })}
					/>
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
