import { LivestockNotificationType } from "@/app/livestock/Livestock";
import { Location } from "@/lib/types/miscellaneous";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { NotifierModel } from "@/lib/types/models/notifier";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";
import { AddCowFormModelView } from "./add-cow-form/add-cow-form-model";
import { CowType } from "@/lib/types/models/cow";

export interface AddCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
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
				currentFormModelView: Omit<AddCowFormModelView, "allLocations">;
			}
	  >;

export type AddCowDialogModel = InitializedModel<
	InteractiveModel<AddCowDialogModelView, AddCowDialogModelInteraction>
>;
