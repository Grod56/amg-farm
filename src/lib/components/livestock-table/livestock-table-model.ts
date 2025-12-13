import { LivestockNotificationType } from "@/app/livestock/Livestock";
import { Location } from "@/lib/types/miscellaneous";
import { CowModel } from "@/lib/types/models/cow";
import { Notification } from "@/lib/types/models/notification";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface LivestockTableModelView {
	cattle: CowModel[];
	selectedCow?: CowModel;
	locations: Location[];
	selectedLocation: Location;
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
