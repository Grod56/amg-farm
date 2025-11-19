import { CowModel } from "@/lib/content/cattle/cow-model";
import { ReadonlyModel } from "@mvc-react/mvc";

export interface TableRowModelView {
	rowNumber: number;
	cattleModel: CowModel;
}

export type TableRowModel = ReadonlyModel<TableRowModelView>;
