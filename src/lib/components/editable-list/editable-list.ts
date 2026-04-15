import { Notification } from "@/lib/types/models/notification";
import {
	InitializedModel,
	InputModelInteraction,
	Model,
	ModelInteraction,
	ModelView,
} from "@mvc-react/mvc";

type EditableListNotification = "success" | "pending" | "failure";
export type Item<V extends ModelView> = InitializedModel<Model<V>>;

export interface EditableListModelView<V extends ModelView> {
	headings: string[];
	items: Item<V>[];
	selectedItem?: Item<V>;
	tableNotification: Notification<EditableListNotification> | null;
}

export type EditableListModelInteraction<V extends ModelView> =
	| InputModelInteraction<"SELECT_ITEM", { item: Item<V> }>
	| ModelInteraction<"RESET_SELECTED_ITEM">
	| InputModelInteraction<
			"ADD_ITEM",
			{
				item: Item<V>;
			}
	  >
	| InputModelInteraction<
			"EDIT_ITEM",
			{
				item: Item<V>;
			}
	  >
	| InputModelInteraction<
			"REMOVE_ITEM",
			{
				item: Item<V>;
			}
	  >
	| InputModelInteraction<
			"UPDATE_LIST",
			{
				items: Item<V>[];
			}
	  >
	| InputModelInteraction<
			"UPDATE_NOTIFICATION",
			{
				notification: Notification<EditableListNotification> | null;
			}
	  >;
