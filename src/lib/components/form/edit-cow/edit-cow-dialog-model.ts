import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModel, CowType } from "@/lib/types/models/cow";
import { Location } from "@/lib/types/miscellaneous";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";
import { LivestockTableModel } from "../../livestock-table/livestock-table-model";

export interface EditCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
	livestockTableModel: LivestockTableModel;
	cowModel: CowModel;
	locations: Location[];
	cowTypes: { type: CowType }[];
}

export type EditCowDialogModelInteraction =
	| InputModelInteraction<
			"TOGGLE_DIALOG",
			{ currentDialogModelView: EditCowDialogModelView }
	  >
	| InputModelInteraction<
			"SUBMIT",
			{
				currentDialogModelView: EditCowDialogModelView;
				updatedCow: CowModel;
			}
	  >;

export type EditCowDialogModel = InitializedModel<
	InteractiveModel<EditCowDialogModelView, EditCowDialogModelInteraction>
>;
