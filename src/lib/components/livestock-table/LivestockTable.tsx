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
												cattleModel.modelView
													.location ==
												computedSelectedLocation,
										),
									selectedCow,
								})}
							/>
						</>
					),
				})}
			/>
		</div>
	);
} as ModeledVoidComponent<LivestockTableModel>;

export default LivestockTable;
