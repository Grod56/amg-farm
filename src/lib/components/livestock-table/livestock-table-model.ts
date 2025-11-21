import { CowModel } from "@/lib/content/cattle/cow-model";
import { Location } from "@/lib/types/miscellaneous";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";
import { NotifierModel } from "../notifier/notifier-model";

export interface LivestockTableModelView {
	selectedCow?: CowModel;
	selectedLocation?: Location;
	notifier: NotifierModel;
}

export type LivestockTableModelInteraction =
	| InputModelInteraction<
			"Change_Location",
			{ currentModelView: LivestockTableModelView; location: Location }
	  >
	| InputModelInteraction<
			"SELECT_COW",
			{ currentModelView: LivestockTableModelView; cowModel: CowModel }
	  >
	| InputModelInteraction<
			"RESET_SELECTED_COW",
			{ currentModelView: LivestockTableModelView }
	  >;

export type LivestockTableModel = InteractiveModel<
	LivestockTableModelView,
	LivestockTableModelInteraction
>;
