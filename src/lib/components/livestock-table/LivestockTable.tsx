import { ModeledVoidComponent } from "@mvc-react/components";
import { LivestockTableModel } from "./livestock-table-model";
import { TableActionsModelInteraction } from "./table-actions/table-actions-model";
import TableActions from "./table-actions/TableActions";
import Table from "./table/Table";

const LivestockTable = function ({ model }) {
	const { modelView, interact } = model;
	const { selectedCow, selectedLocation, notification, tableContent } =
		modelView;
	const { cattle, locations } = tableContent;
	const displayedCattle = cattle.filter(
		cow => cow.modelView.location.id == selectedLocation.id,
	);

	return (
		<div
			tabIndex={0}
			className="livestock-table flex flex-col max-h-full h-4/5 gap-3"
			// onBlur={() =>
			// 	interact({
			// 		type: "RESET_SELECTED_COW",
			// 		input: { currentModelView: modelView! },
			// 	})
			// }
		>
			<TableActions
				model={{
					modelView: {
						locations,
						selectedCow,
						selectedLocation,
						isPending: notification?.type == "pending",
					},
					interact: async (
						interaction: TableActionsModelInteraction,
					) => {
						switch (interaction.type) {
							case "ADD":
								await interact({
									type: "ADD_COW",
									input: {
										defaultLocation: selectedLocation,
									},
								});
								break;
							case "REMOVE":
								if (selectedCow)
									await interact({
										type: "REMOVE_COW",
										input: {
											cow: selectedCow,
										},
									});
								break;
							case "EDIT":
								if (selectedCow)
									await interact({
										type: "EDIT_COW",
										input: {
											cow: selectedCow,
										},
									});
								break;
							case "CHANGE_LOCATION": {
								await interact({
									type: "CHANGE_LOCATION",
									input: {
										location: interaction.input.location,
									},
								});
								break;
							}
							case "CLEAR_SELECTED": {
								await interact({
									type: "RESET_SELECTED_COW",
								});
							}
						}
					},
				}}
			/>
			<Table
				model={{
					modelView: {
						cattle: displayedCattle,
						selectedCow,
					},
					async interact(interaction) {
						switch (interaction.type) {
							case "SELECT_COW": {
								const { cow } = interaction.input;
								await interact({
									type: "SELECT_COW",
									input: {
										cow,
									},
								});
								break;
							}
							case "DESELECT": {
								await interact({
									type: "RESET_SELECTED_COW",
								});
								break;
							}
						}
					},
				}}
			/>
		</div>
	);
} as ModeledVoidComponent<LivestockTableModel>;

export default LivestockTable;
