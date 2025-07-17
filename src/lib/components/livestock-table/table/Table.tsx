import { ComponentList, ModeledVoidComponent } from "@mvc-react/components";
import { TableModel } from "./table-model";
import { newReadonlyModel } from "@mvc-react/mvc";
import TableRow from "../table-row/TableRow";
import "./table.css";

const Table = function ({ model }) {
	const { cattleModels } = model.modelView;
	return (
		<div>
			<table className="border-collapse border-1 w-full">
				<thead>
					<tr>
						<th className="border-1" scope="col">
							Name
						</th>
						<th scope="col">Type</th>
						<th scope="col">Tag</th>
						<th scope="col">D.o.B</th>
					</tr>
				</thead>
				<tbody>
					<ComponentList
						model={newReadonlyModel({
							Component: TableRow,
							componentModels: cattleModels.map(cattleModel =>
								newReadonlyModel({ cattleModel }),
							),
						})}
					/>
				</tbody>
			</table>
		</div>
	);
} as ModeledVoidComponent<TableModel>;

export default Table;
