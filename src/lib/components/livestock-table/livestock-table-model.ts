import { CowModel } from "@/lib/content/cattle/cow-model";
import { Location } from "@/lib/types/miscellaneous";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface LivestockTableModelView {
	selectedCow?: CowModel;
	selectedLocation?: Location;
}

export type LivestockTableModelInteraction =
	| InputModelInteraction<
			"Change_Location",
			{ currentModelView: LivestockTableModelView; location: Location }
	  >
	| InputModelInteraction<
			"SELECT_COW",
			{ currentModelView: LivestockTableModelView; cowModel: CowModel }
	  >;

export type LivestockTableModel = InteractiveModel<
	LivestockTableModelView,
	LivestockTableModelInteraction
>;
