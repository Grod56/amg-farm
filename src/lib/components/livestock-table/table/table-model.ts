import { CowModel } from "@/lib/content/cattle/cow-model";
import {
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface TableModelView {
	cowModels: CowModel[];
	selectedCow: CowModel | undefined;
}

export type TableModelInteraction =
	| InputModelInteraction<"SELECT_COW", { cowModel: CowModel }>
	| ModelInteraction<"DESELECT">;

export type TableModel = InteractiveModel<
	TableModelView,
	TableModelInteraction
>;
