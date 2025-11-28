import { CowModel } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";

export interface TableRowModelView {
	rowNumber: number;
	cowModel: CowModel;
	isSelected: boolean;
}
export type TableRowModelInteraction = InputModelInteraction<
	"SELECT_COW",
	{ cowModel: CowModel }
>;

export type TableRowModel = InitializedModel<
	InteractiveModel<TableRowModelView, TableRowModelInteraction>
>;
