import { CattleModel } from "@/lib/content/cattle/cattle-model";
import { ReadonlyModel } from "@mvc-react/mvc";

export interface TableRowModelView {
	cattleModel: CattleModel;
}

export type TableRowModel = ReadonlyModel<TableRowModelView>;
