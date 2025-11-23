import {
	EditCowDialogModelView,
	EditCowDialogModelInteraction,
} from "@/lib/components/livestock-table/table-actions/edit-cow/edit-cow-dialog-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function editCowDialogVIInterface(): ViewInteractionInterface<
	EditCowDialogModelView,
	EditCowDialogModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "Toggle_Dialog": {
					const {
						cattleRepositoryModel,
						shown,
						cowModel,
						locations,
						livestockTableModel: notifier,
					} = interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						cowModel,
						locations,
						livestockTableModel: notifier,
						shown: !shown,
					};
				}
				case "Submit": {
					const { currentDialogModelView, updatedCow } =
						interaction.input;
					const {
						cattleRepositoryModel,
						locations,
						livestockTableModel,
					} = currentDialogModelView;
					const { name } = updatedCow.modelView!;
					const { modelView: livestockTableModelView } =
						livestockTableModel;
					const { notifier } = livestockTableModelView!;
					cattleRepositoryModel.interact({
						type: "Edit_Cow",
						input: {
							cowModel: updatedCow,
							successCallback() {
								notifier.interact({
									type: "Notify",
									input: {
										text: `${name} successfully modified`,
										variant: "success",
									},
								});
								livestockTableModel.interact({
									type: "RESET_SELECTED_COW",
									input: {
										currentModelView:
											livestockTableModelView!,
									},
								});
							},
							failureCallback(error) {
								notifier.interact({
									type: "Notify",
									input: {
										text: `Could not update cow. Error: ${error}`,
										variant: "failure",
									},
								});
							},
						},
					});
					return {
						cattleRepositoryModel,
						cowModel: updatedCow,
						locations,
						livestockTableModel: livestockTableModel,
						shown: false,
					};
				}
			}
		},
	};
}
