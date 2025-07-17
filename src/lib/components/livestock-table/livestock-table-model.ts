import { CattleModel } from "@/lib/content/cattle/cattle-model";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface LivestockTableModelView {
	selectedCow?: CattleModel;
	selectedLocation?: string;
}

export type LivestockTableModelInteraction = InputModelInteraction<
	"Change_Location",
	{ currentModelView: LivestockTableModelView; location: string }
>;

export type LivestockTableModel = InteractiveModel<
	LivestockTableModelView,
	LivestockTableModelInteraction
>;
