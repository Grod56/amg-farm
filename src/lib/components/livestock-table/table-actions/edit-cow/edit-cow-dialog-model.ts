import { CattleRepositoryModel } from "@/lib/content/cattle/cattle-repository";
import { CowModel } from "@/lib/content/cattle/cow-model";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";
import { EditCowFormModelView } from "./edit-cow-form/edit-cow-form-model";
import { Location } from "@/lib/types/miscellaneous";

export interface EditCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
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
