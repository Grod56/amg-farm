import { ModeledVoidComponent } from "@mvc-react/components";
import { ModelView } from "@mvc-react/mvc";
import { TableRowModel } from "./table-row";

const TableRow = function <V extends ModelView>({
	model,
}: {
	model: TableRowModel<V>;
}) {
	const { modelView, interact } = model;
	const {
		rowNumber,
		rowData: { data, item },
		isSelected,
	} = modelView;

	return (
		<tr
			tabIndex={0}
			className="hover:bg-orange-100 data-[isselected='true']:bg-orange-300"
			data-isselected={isSelected}
			onClick={() => {
				interact({
					type: "SELECT_ITEM",
					input: { item },
				});
			}}
		>
			<td className="text-center max-md:hidden">{rowNumber}</td>
			{data.map((cell, index) => (
				<td key={index}>{cell}</td>
			))}
		</tr>
	);
} satisfies ModeledVoidComponent<TableRowModel<ModelView>>;

export default TableRow;
