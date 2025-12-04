import { CowModel } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface TableModelView {
	cattle: CowModel[];
	selectedCow: CowModel | undefined;
}

export type TableModelInteraction =
	| InputModelInteraction<"SELECT_COW", { cow: CowModel }>
	| ModelInteraction<"DESELECT">;

export type TableModel = InitializedModel<
	InteractiveModel<TableModelView, TableModelInteraction>
>;
