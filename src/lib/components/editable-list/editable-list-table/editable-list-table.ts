import {
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
	ModelView,
} from "@mvc-react/mvc";
import { Item } from "../editable-list";

export interface EditableListTableModelView<V extends ModelView> {
	items: Item<V>[];
	headings: string[];
	selectedItem?: Item<V>;
}

export type EditableListTableModelInteraction<V extends ModelView> =
	| InputModelInteraction<"SELECT_ITEM", { cow: Item<V> }>
	| ModelInteraction<"DESELECT">;

export type EditableListTableModel<V extends ModelView> = InteractiveModel<
	EditableListTableModelView<V>,
	EditableListTableModelInteraction<V>
>;
