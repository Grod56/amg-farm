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
	tableContent: {
		cattle: CowModel[];
		locations: Location[];
	};
	selectedCow?: CowModel;
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
	  >
	| InputModelInteraction<
			"UPDATE_CONTENT",
			{
				tableContent: {
					cattle: CowModel[];
					locations: Location[];
				};
			}
	  >
	| InputModelInteraction<
			"UPDATE_NOTIFICATION",
			{
				notification: Notification<LivestockNotificationType> | null;
			}
	  >;

export type LivestockTableModel = InitializedModel<
	InteractiveModel<LivestockTableModelView, LivestockTableModelInteraction>
>;
