import { ComponentList, ModeledVoidComponent } from "@mvc-react/components";
import { newReadonlyModel } from "@mvc-react/mvc";
import {
	TableRowModel,
	TableRowModelInteraction,
} from "../table-row/table-row-model";
import TableRow from "../table-row/TableRow";
import { TableModel } from "./table-model";
import "./table.css";

const Table = function ({ model }: { model: TableModel }) {
	const { modelView, interact } = model;
	const { cowModels, selectedCow } = modelView!;

	return (
		<div className="h-full w-full overflow-y-auto">
			<table className="w-full h-full border-collapse rounded-lg overflow-hidden border-gray-300">
				<thead className="max-w-full w-full">
					<tr className="text-white bg-gray-800">
						<th className="text-center max-md:hidden" scope="col">
							No.
						</th>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Tag</th>
						<th scope="col">DOB</th>
					</tr>
				</thead>
				<tbody className="bg-gray-100">
					<ComponentList
						model={newReadonlyModel({
							Component: TableRow,
							componentModels: cowModels.map(
								(cowModel, index) =>
									({
										modelView: {
											cowModel,
											isSelected: selectedCow == cowModel,
											rowNumber: index + 1,
										},
										interact: function (
											interaction: TableRowModelInteraction,
										) {
											switch (interaction.type) {
												case "SELECT_COW": {
													const { cowModel } =
														interaction.input;
													interact({
														type: "SELECT_COW",
														input: { cowModel },
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
} as ModeledVoidComponent<TableModel>;

export default Table;
