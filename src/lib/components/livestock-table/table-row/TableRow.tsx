import { ModeledVoidComponent } from "@mvc-react/components";
import { TableRowModel } from "./table-row-model";

const TableRow = function ({ model }) {
	const { name, type, tag, dob } = model.modelView.cattleModel.modelView;
	return (
		<tr>
			<td>{name}</td>
			<td>{type}</td>
			<td>{tag}</td>
			<td>{dob.toLocaleDateString()}</td>
		</tr>
	);
} as ModeledVoidComponent<TableRowModel>;

export default TableRow;
