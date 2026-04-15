import { ComponentList, ModeledVoidComponent } from "@mvc-react/components";
import { EditableListTableModel } from "./editable-list-table";
import {
	InitializedModel,
	Model,
	ModelView,
	newReadonlyModel,
} from "@mvc-react/mvc";
import {
	TableRowModelInteraction,
	TableRowModel,
} from "../../livestock-table/table-row/table-row-model";
import TableRow from "../../livestock-table/table-row/TableRow";

const EditableListTable = function ({ model }) {
	const { headings, items, selectedItem } = model.modelView;

	return (
		<div className="h-full w-full overflow-y-auto">
			<table className="w-full h-full border-collapse rounded-lg overflow-hidden border-gray-300">
				<thead className="max-w-full w-full">
					<tr className="text-white bg-gray-800">
						<th className="text-center max-md:hidden" scope="col">
							No.
						</th>
						{headings.map(heading => (
							<th key={heading} scope="col">
								{heading}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-gray-100">
					<ComponentList
						model={newReadonlyModel({
							Component: TableRow,
							componentModels: cattle.map(
								(cow, index) =>
									({
										modelView: {
											cow: cow,
											isSelected: selectedCow == cow,
											rowNumber: index + 1,
										},
										interact: async function (
											interaction: TableRowModelInteraction,
										) {
											switch (interaction.type) {
												case "SELECT_COW": {
													const { cow: cowModel } =
														interaction.input;
													await interact({
														type: "SELECT_COW",
														input: {
															cow: cowModel,
														},
													});
												}
											}
										},
									}) as TableRowModel,
							),
						})}
					/>
				</tbody>
			</table>
		</div>
	);
} satisfies ModeledVoidComponent<
	InitializedModel<EditableListTableModel<ModelView>>
>;

export default EditableListTable;
