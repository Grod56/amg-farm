import { CowModel } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";

export interface TableRowModelView {
	rowNumber: number;
	cow: CowModel;
	isSelected: boolean;
}
export type TableRowModelInteraction = InputModelInteraction<
	"SELECT_COW",
	{ cow: CowModel }
>;

export type TableRowModel = InitializedModel<
	InteractiveModel<TableRowModelView, TableRowModelInteraction>
>;
