import { CowModel } from "@/lib/content/cattle/cow-model";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface TableRowModelView {
	rowNumber: number;
	cowModel: CowModel;
	isSelected: boolean;
}
export type TableRowModelInteraction = InputModelInteraction<
	"SELECT_COW",
	{ cowModel: CowModel }
>;

export type TableRowModel = InteractiveModel<
	TableRowModelView,
	TableRowModelInteraction
>;
