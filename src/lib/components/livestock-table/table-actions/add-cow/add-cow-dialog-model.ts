import { CattleRepositoryModel } from "@/lib/content/cattle/cattle-repository";
import { Location } from "@/lib/types/miscellaneous";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";
import { AddCowFormModelView } from "./add-cow-form/add-cow-form-model";

export interface AddCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
	location: Location;
}

export type AddCowDialogModelInteraction =
	| InputModelInteraction<
			"Toggle_Dialog",
			{ currentDialogModelView: AddCowDialogModelView }
	  >
	| InputModelInteraction<
			"Submit",
			{
				currentDialogModelView: AddCowDialogModelView;
				currentFormModelView: AddCowFormModelView;
			}
	  >;

export type AddCowDialogModel = InteractiveModel<
	AddCowDialogModelView,
	AddCowDialogModelInteraction
>;
