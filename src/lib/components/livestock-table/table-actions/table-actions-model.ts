import { CowModel } from "@/lib/content/cattle/cow-model";
import { Location } from "@/lib/types/miscellaneous";
import {
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export type TableActionsModelInteraction =
	| ModelInteraction<"Add">
	| ModelInteraction<"Remove">
	| ModelInteraction<"Edit">
	| InputModelInteraction<"Change_Location", { location: Location }>;

export interface TableActionsModelView {
	locations: Location[];
	selectedLocation: Location;
	selectedCow: CowModel | undefined;
}

export type TableActionsModel = InteractiveModel<
	TableActionsModelView,
	TableActionsModelInteraction
>;
