import { InteractiveModel, ModelInteraction, ModelView } from "@mvc-react/mvc";

export interface EditableListActionsModelView<V extends ModelView> {
	selectedItem: V | null;
	isPending: boolean;
}

export type EditableListActionsModelInteraction =
	| ModelInteraction<"ADD">
	| ModelInteraction<"REMOVE">
	| ModelInteraction<"EDIT">
	| ModelInteraction<"CLEAR_SELECTED">;

export type EditableListActionsModel<V extends ModelView> = InteractiveModel<
	EditableListActionsModelView<V>,
	EditableListActionsModelInteraction
>;
