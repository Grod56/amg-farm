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
	| ModelInteraction<"Add">
	| ModelInteraction<"Remove">
	| ModelInteraction<"Edit">
	| ModelInteraction<"Clear_Selected">
	| InputModelInteraction<"Change_Location", { location: Location }>;

export type TableActionsModel = InitializedModel<
	InteractiveModel<TableActionsModelView, TableActionsModelInteraction>
>;
