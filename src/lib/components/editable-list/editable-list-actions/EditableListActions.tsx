import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModeledVoidComponent } from "@mvc-react/components";
import { InitializedModel, ModelView } from "@mvc-react/mvc";
import { EditableListActionsModel } from "./editable-list-actions";

const EditableListActions = function ({ model }) {
	const { interact, modelView } = model;
	const { selectedItem, isPending } = modelView;

	return (
		<div className="flex gap-7 justify-between w-full">
			<div className="flex gap-4 pr-5">
				<button
					className="add disabled:text-gray-400 disabled:cursor-default cursor-pointer"
					title="Add Cow"
					disabled={isPending}
				>
					<FontAwesomeIcon
						icon={faAdd}
						onClick={() => {
							interact({ type: "ADD" });
						}}
					/>
				</button>
				<button
					className="remove text-red-800 disabled:text-gray-400 disabled:cursor-default cursor-pointer"
					hidden={!selectedItem}
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
					hidden={!selectedItem}
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
					hidden={!selectedItem}
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
} as ModeledVoidComponent<
	InitializedModel<EditableListActionsModel<ModelView>>
>;

export default EditableListActions;
