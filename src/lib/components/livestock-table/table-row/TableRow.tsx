import { ModeledVoidComponent } from "@mvc-react/components";
import { TableRowModel } from "./table-row-model";

const TableRow = function ({ model }) {
	const { rowNumber, cattleModel } = model.modelView;
	const { name, type, tag, dob } = cattleModel.modelView;
	return (
		<tr>
			<td>{rowNumber}</td>
			<td>{name}</td>
			<td>{type}</td>
			<td>{tag}</td>
			<td>
				{dob.toLocaleDateString("en-UK", {
					year: "numeric",
					month: "short",
					day: "2-digit",
				})}
			</td>
		</tr>
	);
} as ModeledVoidComponent<TableRowModel>;

export default TableRow;
