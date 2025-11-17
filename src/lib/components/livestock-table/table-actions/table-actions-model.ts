import { CowModel } from "@/lib/content/cattle/cow-model";
import {
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export type TableActionsModelInteraction =
	| ModelInteraction<"Add">
	| ModelInteraction<"Remove">
	| ModelInteraction<"Edit">
	| InputModelInteraction<"Change_Location", { locationName: string }>;

export interface TableActionsModelView {
	locationNames: string[];
	selectedLocationName: string;
	selectedCow: CowModel | undefined;
}

export type TableActionsModel = InteractiveModel<
	TableActionsModelView,
	TableActionsModelInteraction
>;
