import { LivestockNotificationType } from "@/app/livestock/Livestock";
import { Location } from "@/lib/types/miscellaneous";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { NotifierModel } from "@/lib/types/models/notifier";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";
import { CowModelView, CowType } from "@/lib/types/models/cow";
import { LivestockTableModel } from "../../livestock-table/livestock-table-model";

export interface AddCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
	livestockTableModel: LivestockTableModel;
	notifier: NotifierModel<LivestockNotificationType>;
	location: Location;
	allLocations: Location[];
	cowTypes: { type: CowType }[];
}

export type AddCowDialogModelInteraction =
	| InputModelInteraction<
			"TOGGLE_DIALOG",
			{ currentDialogModelView: AddCowDialogModelView }
	  >
	| InputModelInteraction<
			"SUBMIT",
			{
				currentDialogModelView: AddCowDialogModelView;
				cowToBeAdded: Omit<CowModelView, "id">;
			}
	  >;

export type AddCowDialogModel = InitializedModel<
	InteractiveModel<AddCowDialogModelView, AddCowDialogModelInteraction>
>;
