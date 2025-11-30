import { CowModel } from "@/lib/types/models/cow";
import { Location } from "@/lib/types/miscellaneous";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface TableActionsModelView {
	locations: Location[];
	selectedLocation: Location;
	selectedCow: CowModel | undefined;
	isPending: boolean;
}

export type TableActionsModelInteraction =
	| ModelInteraction<"ADD">
	| ModelInteraction<"REMOVE">
	| ModelInteraction<"EDIT">
	| ModelInteraction<"CLEAR_SELECTED">
	| InputModelInteraction<"CHANGE_LOCATION", { location: Location }>;

export type TableActionsModel = InitializedModel<
	InteractiveModel<TableActionsModelView, TableActionsModelInteraction>
>;
