import { CattleRepositoryModel } from "@/lib/content/cattle/cattle-repository";
import { CowModel } from "@/lib/content/cattle/cow-model";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";
import { LivestockTableModel } from "../../livestock-table-model";

export interface RemoveCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
	livestockTableModel: LivestockTableModel;
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
