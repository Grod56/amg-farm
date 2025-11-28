import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";
import { LivestockTableModel } from "../../livestock-table/livestock-table-model";

export interface RemoveCowDialogModelView {
	shown: boolean;
	cattleRepositoryModel: CattleRepositoryModel;
	livestockTableModel: LivestockTableModel;
	cowModel: CowModel;
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

export type RemoveCowDialogModel = InitializedModel<
	InteractiveModel<RemoveCowDialogModelView, RemoveCowDialogModelInteraction>
>;
