import { ModeledVoidComponent } from "@mvc-react/components";
import { LivestockTableModel } from "./livestock-table-model";
import { TableActionsModelInteraction } from "./table-actions/table-actions-model";
import TableActions from "./table-actions/TableActions";
import Table from "./table/Table";

const LivestockTable = function ({ model }) {
	const { modelView, interact } = model;
	const { selectedCow, selectedLocation, notification, cattle, locations } =
		modelView;
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
					interact: (interaction: TableActionsModelInteraction) => {
						switch (interaction.type) {
							case "ADD":
								interact({
									type: "ADD_COW",
									input: {
										defaultLocation: selectedLocation,
									},
								});
								break;
							case "REMOVE":
								if (selectedCow)
									interact({
										type: "REMOVE_COW",
										input: {
											cow: selectedCow,
										},
									});
								break;
							case "EDIT":
								if (selectedCow)
									interact({
										type: "EDIT_COW",
										input: {
											cow: selectedCow,
										},
									});
								break;
							case "CHANGE_LOCATION": {
								interact({
									type: "CHANGE_LOCATION",
									input: {
										location: interaction.input.location,
									},
								});
								break;
							}
							case "CLEAR_SELECTED": {
								interact({
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
					interact(interaction) {
						switch (interaction.type) {
							case "SELECT_COW": {
								const { cow } = interaction.input;
								interact({
									type: "SELECT_COW",
									input: {
										cow,
									},
								});
								break;
							}
							case "DESELECT": {
								interact({
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
