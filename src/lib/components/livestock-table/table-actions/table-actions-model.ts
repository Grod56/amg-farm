import { CattleModel } from "@/lib/content/cattle/cattle-model";
import {
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export type TableActionsModelInteraction =
	| ModelInteraction<"Add">
	| ModelInteraction<"Remove">
	| ModelInteraction<"Edit">
	| InputModelInteraction<"Change_Location", { location: string }>;

export interface TableActionsModelView {
	locations: string[];
	selectedLocation: string;
	selectedCow: CattleModel | undefined;
}

export type TableActionsModel = InteractiveModel<
	TableActionsModelView,
	TableActionsModelInteraction
>;
