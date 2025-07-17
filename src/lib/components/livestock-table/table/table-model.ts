import { CattleModel } from "@/lib/content/cattle/cattle-model";
import { ReadonlyModel } from "@mvc-react/mvc";

export interface TableModelView {
	cattleModels: CattleModel[];
	selectedCow: CattleModel | undefined;
}

export type TableModel = ReadonlyModel<TableModelView>;
