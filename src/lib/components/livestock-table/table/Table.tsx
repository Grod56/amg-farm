import { ComponentList, ModeledVoidComponent } from "@mvc-react/components";
import { newReadonlyModel } from "@mvc-react/mvc";
import {
	TableRowModel,
	TableRowModelInteraction,
} from "../table-row/table-row-model";
import TableRow from "../table-row/TableRow";
import { TableModel } from "./table-model";
import "./table.css";

const Table = function ({ model }) {
	const { modelView, interact } = model;
	const { cowModels, selectedCow } = modelView!;

	return (
		<div>
			<table className="border-collapse border-1 w-full">
				<thead>
					<tr>
						<th scope="col">No.</th>
						<th scope="col">Name</th>
						<th scope="col">Type</th>
						<th scope="col">Tag</th>
						<th scope="col">D.o.B</th>
					</tr>
				</thead>
				<tbody>
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
