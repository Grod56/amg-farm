import { CowModel } from "@/lib/content/cattle/cow-model";
import { ReadonlyModel } from "@mvc-react/mvc";

export interface TableRowModelView {
	cattleModel: CowModel;
}

export type TableRowModel = ReadonlyModel<TableRowModelView>;
