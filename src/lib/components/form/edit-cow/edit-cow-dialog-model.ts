import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
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
}

export type EditCowDialogModelInteraction =
	| InputModelInteraction<
			"Toggle_Dialog",
			{ currentDialogModelView: EditCowDialogModelView }
	  >
	| InputModelInteraction<
			"Submit",
			{
				currentDialogModelView: EditCowDialogModelView;
				updatedCow: CowModel;
			}
	  >;

export type EditCowDialogModel = InitializedModel<
	InteractiveModel<EditCowDialogModelView, EditCowDialogModelInteraction>
>;
