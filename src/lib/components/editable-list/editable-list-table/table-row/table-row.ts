import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelView,
} from "@mvc-react/mvc";
import { Item } from "../../editable-list";
import { ReactNode } from "react";

export type RowData<V extends ModelView> = {
	item: Item<V>;
	data: ReactNode[];
};

export interface TableRowModelView<V extends ModelView> {
	rowNumber: number;
	rowData: RowData<V>;
	isSelected: boolean;
}
export type TableRowModelInteraction<V extends ModelView> =
	InputModelInteraction<"SELECT_ITEM", { item: Item<V> }>;

export type TableRowModel<V extends ModelView> = InitializedModel<
	InteractiveModel<TableRowModelView<V>, TableRowModelInteraction<V>>
>;
