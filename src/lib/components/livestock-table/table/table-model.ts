import { CowModel } from "@/lib/content/cattle/cow-model";
import { ReadonlyModel } from "@mvc-react/mvc";

export interface TableModelView {
	cattleModels: CowModel[];
	selectedCow: CowModel | undefined;
}

export type TableModel = ReadonlyModel<TableModelView>;
