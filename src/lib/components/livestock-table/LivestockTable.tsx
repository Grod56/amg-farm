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

const LivestockTable = function ({ model }) {
	const cattleRepositoryModel = useStatefulRepository({
		modelView: null,
		viewInteractionInterface: cattleRepositoryViewInteractionInterface,
	});
	const { modelView, interact } = model;
	const { selectedCow, selectedLocation } = modelView!;
	const { modelView: repositoryModelView } = cattleRepositoryModel;
	const computedSelectedLocation = selectedLocation
		? selectedLocation
		: repositoryModelView?.locations[0];

	const addCowDialogModel = useNewStatefulInteractiveModel(
		addCowDialogVIInterface(),
	);
	const editCowDialogModel = useNewStatefulInteractiveModel(
		editCowDialogVIInterface(),
	);
	const removeCowDialogModel = useNewStatefulInteractiveModel(
		removeCowDialogVIInterface(),
	);

	return (
		<div className="livestock-table flex flex-col gap-3">
			<ConditionalComponent
				model={newReadonlyModel({
					condition: repositoryModelView,
					components: new Map([[null, () => <></>]]),
					FallBackComponent: () => (
						<>
							<TableActions
								model={{
									modelView: {
										locations:
											repositoryModelView!.locations,
										selectedCow,
										selectedLocation:
											computedSelectedLocation!,
									},
									interact: (
										interaction: TableActionsModelInteraction,
									) => {
										switch (interaction.type) {
											case "Add":
												addCowDialogModel.interact({
													type: "Toggle_Dialog",
													input: {
														currentDialogModelView:
															{
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
													removeCowDialogModel.interact(
														{
															type: "TOGGLE_DIALOG",
															input: {
																currentDialogModelView:
																	{
																		cattleRepositoryModel,
																		shown: false,
																		cowModel:
																			selectedCow,
																	},
															},
														},
													);
												break;
											case "Edit":
												if (selectedCow)
													editCowDialogModel.interact(
														{
															type: "Toggle_Dialog",
															input: {
																currentDialogModelView:
																	{
																		cattleRepositoryModel,
																		shown: false,
																		cowModel:
																			selectedCow,
																		locations:
																			repositoryModelView!
																				.locations,
																	},
															},
														},
													);
												break;
											case "Change_Location": {
												interact({
													type: interaction.type,
													input: {
														...interaction.input,
														currentModelView:
															modelView!,
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
													cattleModel.modelView
														.location.id ==
													computedSelectedLocation!
														.id,
											),
										selectedCow,
									},
									interact(interaction) {
										switch (interaction.type) {
											case "SELECT_COW": {
												const { cowModel } =
													interaction.input;
												interact({
													type: "SELECT_COW",
													input: {
														cowModel,
														currentModelView:
															modelView!,
													},
												});
											}
										}
									},
								}}
							/>
						</>
					),
				})}
			/>
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
											location: computedSelectedLocation!,
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
						<EditCowDialog
							model={{
								...editCowDialogModel,
								modelView: editCowDialogModel.modelView
									? editCowDialogModel.modelView
									: {
											cowModel: selectedCow!,
											shown: false,
											cattleRepositoryModel,
											locations:
												cattleRepositoryModel.modelView!
													.locations,
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
