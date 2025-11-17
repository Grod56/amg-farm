import { CowModel } from "@/lib/content/cattle/cow-model";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface LivestockTableModelView {
	selectedCow?: CowModel;
	selectedLocationName?: string;
}

export type LivestockTableModelInteraction = InputModelInteraction<
	"Change_Location",
	{ currentModelView: LivestockTableModelView; locationName: string }
>;

export type LivestockTableModel = InteractiveModel<
	LivestockTableModelView,
	LivestockTableModelInteraction
>;
