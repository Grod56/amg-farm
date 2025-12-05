import { ModeledVoidComponent } from "@mvc-react/components";
import Spinner from "react-bootstrap/Spinner";
import { LivestockTableModel } from "./livestock-table-model";
import { TableActionsModelInteraction } from "./table-actions/table-actions-model";
import TableActions from "./table-actions/TableActions";
import Table from "./table/Table";

const LivestockTable = function ({ model }) {
	const { modelView, interact } = model;
	const {
		selectedCow,
		selectedLocation,
		notification,
		cattleRepositoryModelView,
	} = modelView;
	const computedSelectedLocation =
		selectedLocation ?? cattleRepositoryModelView?.activeLocations[0];
	const displayedCattle = cattleRepositoryModelView?.cattle.filter(
		cow => cow.modelView.location.id == computedSelectedLocation!.id,
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
			{cattleRepositoryModelView ? (
				<>
					<TableActions
						model={{
							modelView: {
								locations:
									cattleRepositoryModelView.activeLocations,
								selectedCow,
								selectedLocation: computedSelectedLocation!,
								isPending: notification?.type == "pending",
							},
							interact: (
								interaction: TableActionsModelInteraction,
							) => {
								switch (interaction.type) {
									case "ADD":
										if (selectedLocation)
											interact({
												type: "ADD_COW",
												input: {
													defaultLocation:
														selectedLocation,
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
												...interaction.input,
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
								cattle: displayedCattle!,
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
				</>
			) : (
				<Spinner
					animation="border"
					color="black"
					className="size-16! mx-auto my-auto"
				/>
			)}
		</div>
	);
} as ModeledVoidComponent<LivestockTableModel>;

export default LivestockTable;
