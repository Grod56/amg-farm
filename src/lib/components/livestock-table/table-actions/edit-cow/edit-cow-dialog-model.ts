import { CattleRepositoryModel } from "@/lib/content/cattle/cattle-repository";
import { CowModel } from "@/lib/content/cattle/cow-model";
import { Location } from "@/lib/types/miscellaneous";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";
import { LivestockTableModel } from "../../livestock-table-model";
import { EditCowFormModelView } from "./edit-cow-form/edit-cow-form-model";

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
				currentFormModelView: EditCowFormModelView;
			}
	  >;

export type AddCowDialogModel = InteractiveModel<
	EditCowDialogModelView,
	EditCowDialogModelInteraction
>;
