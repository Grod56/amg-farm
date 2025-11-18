import { CattleRepositoryModel } from "@/lib/content/cattle/cattle-repository";
import { Location } from "@/lib/types/miscellaneous";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface AddCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
	location: Location;
}

export type AddCowDialogModelInteraction = InputModelInteraction<
	"Toggle_Dialog",
	{ currentDialogModelView: AddCowDialogModelView }
>;

export type AddCowDialogModel = InteractiveModel<
	AddCowDialogModelView,
	AddCowDialogModelInteraction
>;
