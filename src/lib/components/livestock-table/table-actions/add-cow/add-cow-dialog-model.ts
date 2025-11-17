import { CattleRepositoryModel } from "@/lib/content/cattle/cattle-repository";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface AddCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
	locationNames: string[];
}

export type AddCowDialogModelInteraction = InputModelInteraction<
	"Toggle_Dialog",
	{ currentDialogModelView: AddCowDialogModelView }
>;

export type AddCowDialogModel = InteractiveModel<
	AddCowDialogModelView,
	AddCowDialogModelInteraction
>;
