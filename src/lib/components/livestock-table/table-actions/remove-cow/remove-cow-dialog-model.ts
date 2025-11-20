import { CattleRepositoryModel } from "@/lib/content/cattle/cattle-repository";
import { CowModel } from "@/lib/content/cattle/cow-model";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface RemoveCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
	cowModel: CowModel | undefined;
}

export type RemoveCowDialogModelInteraction =
	| InputModelInteraction<
			"REMOVE_COW",
			{ currentDialogModelView: RemoveCowDialogModelView }
	  >
	| InputModelInteraction<
			"TOGGLE_DIALOG",
			{ currentDialogModelView: RemoveCowDialogModelView }
	  >;

export type RemoveCowDialogModel = InteractiveModel<
	RemoveCowDialogModelView,
	RemoveCowDialogModelInteraction
>;
