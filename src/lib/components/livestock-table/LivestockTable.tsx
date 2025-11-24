import { addCowDialogVIInterface } from "@/lib/implementations/models/add-cow-dialog";
import { editCowDialogVIInterface } from "@/lib/implementations/models/edit-cow-dialog";
import { removeCowDialogVIInterface } from "@/lib/implementations/models/remove-cow-dialog";
import { cattleRepositoryViewInteractionInterface } from "@/lib/implementations/repositories/cattle-repository";
import { useStatefulRepository } from "@/lib/utilities/repositories/use-repository";
import {
	ConditionalComponent,
	ModeledVoidComponent,
} from "@mvc-react/components";
import { newReadonlyModel } from "@mvc-react/mvc";
import { useNewStatefulInteractiveModel } from "@mvc-react/stateful";
import { LivestockTableModel } from "./livestock-table-model";
import AddCowDialog from "./table-actions/add-cow/AddCowDialog";
import EditCowDialog from "./table-actions/edit-cow/EditCowDialog";
import RemoveCowDialog from "./table-actions/remove-cow/RemoveCowDialog";
import { TableActionsModelInteraction } from "./table-actions/table-actions-model";
import TableActions from "./table-actions/TableActions";
import Table from "./table/Table";
import Spinner from "react-bootstrap/Spinner";

const LivestockTable = function ({ model }) {
	const cattleRepositoryModel = useStatefulRepository({
		modelView: null,
		viewInteractionInterface: cattleRepositoryViewInteractionInterface,
	});
	const { modelView, interact } = model;
	const { selectedCow, selectedLocation, notifier } = modelView!;
	const { variant } = notifier.modelView!;
	const { modelView: repositoryModelView } = cattleRepositoryModel;
	const computedSelectedLocation = selectedLocation
		? selectedLocation
		: repositoryModelView?.activeLocations[0];

	const addCowDialogModel = useNewStatefulInteractiveModel(
		addCowDialogVIInterface(),
	);
	const editCowDialogModel = useNewStatefulInteractiveModel(
		editCowDialogVIInterface(),
	);
	const removeCowDialogModel = useNewStatefulInteractiveModel(
		removeCowDialogVIInterface(),
	);
	console.log(variant);

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
			{repositoryModelView ? (
				<>
					<TableActions
						model={{
							modelView: {
								locations: repositoryModelView!.activeLocations,
								selectedCow,
								selectedLocation: computedSelectedLocation!,
								isPending:
									notifier.modelView!.variant == "pending",
							},
							interact: (
								interaction: TableActionsModelInteraction,
							) => {
								switch (interaction.type) {
									case "Add":
										addCowDialogModel.interact({
											type: "Toggle_Dialog",
											input: {
												currentDialogModelView: {
													notifier,
													cattleRepositoryModel,
													shown: false,
													location:
														computedSelectedLocation!,
												},
											},
										});
										break;
									case "Remove":
										if (selectedCow)
											removeCowDialogModel.interact({
												type: "TOGGLE_DIALOG",
												input: {
													currentDialogModelView: {
														livestockTableModel:
															model,
														cattleRepositoryModel,
														shown: false,
														cowModel: selectedCow,
													},
												},
											});
										break;
									case "Edit":
										if (selectedCow)
											editCowDialogModel.interact({
												type: "Toggle_Dialog",
												input: {
													currentDialogModelView: {
														livestockTableModel:
															model,
														cattleRepositoryModel,
														shown: false,
														cowModel: selectedCow,
														locations:
															repositoryModelView!
																.allLocations,
													},
												},
											});
										break;
									case "Change_Location": {
										interact({
											type: interaction.type,
											input: {
												...interaction.input,
												currentModelView: modelView!,
											},
										});
										break;
									}
								}
							},
						}}
					/>
					<Table
						model={{
							modelView: {
								cowModels:
									repositoryModelView!.cowModels.filter(
										cattleModel =>
											cattleModel.modelView.location.id ==
											computedSelectedLocation!.id,
									),
								selectedCow,
							},
							interact(interaction) {
								switch (interaction.type) {
									case "SELECT_COW": {
										const { cowModel } = interaction.input;
										interact({
											type: "SELECT_COW",
											input: {
												cowModel,
												currentModelView: modelView!,
											},
										});
										break;
									}
									case "DESELECT": {
										interact({
											type: "RESET_SELECTED_COW",
											input: {
												currentModelView: modelView!,
											},
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
					className="!size-16 mx-auto my-auto"
				/>
			)}
			<ConditionalComponent
				model={newReadonlyModel({
					condition: repositoryModelView,
					components: new Map([
						[null, () => <></>],
						[undefined, () => <></>],
					]),
					FallBackComponent: () => (
						<AddCowDialog
							model={{
								...addCowDialogModel,
								modelView: addCowDialogModel.modelView
									? addCowDialogModel.modelView
									: {
											shown: false,
											cattleRepositoryModel,
											notifier,
											location: computedSelectedLocation!,
										},
							}}
						/>
					),
				})}
			/>
			{/* {selectedCow && (
				<EditCowDialog
					model={{
						...editCowDialogModel,
						modelView: editCowDialogModel.modelView
							? editCowDialogModel.modelView
							: {
									cowModel: selectedCow!,
									shown: false,
									cattleRepositoryModel,
									livestockTableModel: model,
									locations:
										cattleRepositoryModel.modelView!
											.allLocations,
								},
					}}
				/>
			)} */}
			<ConditionalComponent
				model={newReadonlyModel({
					condition: selectedCow,
					components: new Map([
						[null, () => <></>],
						[undefined, () => <></>],
					]),
					FallBackComponent: () => (
						<EditCowDialog
							model={{
								...editCowDialogModel,
								modelView: editCowDialogModel.modelView
									? editCowDialogModel.modelView
									: {
											cowModel: selectedCow!,
											shown: false,
											cattleRepositoryModel,
											livestockTableModel: model,
											locations:
												cattleRepositoryModel.modelView!
													.allLocations,
										},
							}}
						/>
					),
				})}
			/>
			<ConditionalComponent
				model={newReadonlyModel({
					condition: selectedCow,
					components: new Map([
						[null, () => <></>],
						[undefined, () => <></>],
					]),
					FallBackComponent: () => (
						<RemoveCowDialog
							model={{
								...removeCowDialogModel,
								modelView: removeCowDialogModel.modelView
									? removeCowDialogModel.modelView
									: {
											cowModel: selectedCow!,
											livestockTableModel: model,
											shown: false,
											cattleRepositoryModel,
										},
							}}
						/>
					),
				})}
			/>
		</div>
	);
} as ModeledVoidComponent<LivestockTableModel>;

export default LivestockTable;
