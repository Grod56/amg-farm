import { LivestockNotificationType } from "@/app/livestock/Livestock";
import { Location } from "@/lib/types/miscellaneous";
import { Notification } from "@/lib/types/models/notification";
import { CattleRepositoryModelView } from "@/lib/types/models/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface LivestockTableModelView {
	cattleRepositoryModelView: CattleRepositoryModelView | null;
	selectedCow?: CowModel;
	selectedLocation?: Location;
	notification: Notification<LivestockNotificationType> | null;
}

export type LivestockTableModelInteraction =
	| InputModelInteraction<"CHANGE_LOCATION", { location: Location }>
	| InputModelInteraction<"SELECT_COW", { cow: CowModel }>
	| ModelInteraction<"RESET_SELECTED_COW">
	| InputModelInteraction<
			"ADD_COW",
			{
				defaultLocation: Location;
			}
	  >
	| InputModelInteraction<
			"EDIT_COW",
			{
				cow: CowModel;
			}
	  >
	| InputModelInteraction<
			"REMOVE_COW",
			{
				cow: CowModel;
			}
	  >;

export type LivestockTableModel = InitializedModel<
	InteractiveModel<LivestockTableModelView, LivestockTableModelInteraction>
>;
