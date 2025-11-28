import { CowModel } from "@/lib/types/models/cow";
import { Location } from "@/lib/types/miscellaneous";
import {
	InteractiveModel,
	InitializedModel,
	InputModelInteraction,
} from "@mvc-react/mvc";
import { NotifierModel } from "@/lib/types/models/notifier";
import { LivestockNotificationType } from "@/app/livestock/Livestock";

export interface LivestockTableModelView {
	selectedCow?: CowModel;
	selectedLocation?: Location;
	notifier: NotifierModel<LivestockNotificationType>;
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

export type LivestockTableModel = InitializedModel<
	InteractiveModel<LivestockTableModelView, LivestockTableModelInteraction>
>;
