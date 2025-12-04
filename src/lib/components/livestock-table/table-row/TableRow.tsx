import { ModeledVoidComponent } from "@mvc-react/components";
import { TableRowModel } from "./table-row-model";

const TableRow = function ({ model }) {
	const { modelView, interact } = model;
	const { rowNumber, cow, isSelected } = modelView;
	const { name, type, tag, dob } = cow.modelView;

	return (
		<tr
			tabIndex={0}
			className="hover:bg-orange-100 data-[isselected='true']:bg-orange-300"
			data-isselected={isSelected}
			onClick={() => {
				interact({
					type: "SELECT_COW",
					input: { cow },
				});
			}}
		>
			<td className="text-center max-md:hidden">{rowNumber}</td>
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
