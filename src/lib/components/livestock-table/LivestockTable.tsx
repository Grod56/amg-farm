import {
	ConditionalComponent,
	ModeledVoidComponent,
} from "@mvc-react/components";
import { newReadonlyModel } from "@mvc-react/mvc";
import { LivestockTableModel } from "./livestock-table-model";
import { TableActionsModelInteraction } from "./table-actions/table-actions-model";
import TableActions from "./table-actions/TableActions";
import Table from "./table/Table";
import { useStatefulRepository } from "@/lib/utilities/repositories/use-repository";
import { cattleRepositoryViewInteractionInterface } from "@/lib/implementations/repositories/cattle-repository";
import { addCowDialogVIInterface } from "@/lib/implementations/models/add-cow-dialog";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import AddCowDialog from "./table-actions/add-cow/AddCowDialog";

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

	const addCowDialogModel = useInitializedStatefulInteractiveModel(
		addCowDialogVIInterface(),
		{
			cattleRepositoryModel,
			shown: false,
			location: {
				id: "",
				name: "",
			},
		},
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
												addCowDialogModel!.interact({
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
												break;
											case "Edit":
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
								model={newReadonlyModel({
									cattleModels:
										repositoryModelView!.cattleModels.filter(
											cattleModel =>
												cattleModel.modelView.location
													.id ==
												computedSelectedLocation!.id,
										),
									selectedCow,
								})}
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
						<AddCowDialog model={addCowDialogModel} />
					),
				})}
			/>
		</div>
	);
} as ModeledVoidComponent<LivestockTableModel>;

export default LivestockTable;
