import {
	RemoveCowDialogModelView,
	RemoveCowDialogModelInteraction,
} from "@/lib/components/livestock-table/table-actions/remove-cow/remove-cow-dialog-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function removeCowDialogVIInterface(): ViewInteractionInterface<
	RemoveCowDialogModelView,
	RemoveCowDialogModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "TOGGLE_DIALOG": {
					const {
						cattleRepositoryModel,
						shown,
						cowModel,
						livestockTableModel,
					} = interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						cowModel,
						livestockTableModel,
						shown: !shown,
					};
				}
				case "REMOVE_COW": {
					const {
						cattleRepositoryModel,
						cowModel,
						livestockTableModel,
					} = interaction.input.currentDialogModelView;
					const { name } = cowModel!.modelView;
					const { notifier } = livestockTableModel.modelView!;
					cattleRepositoryModel.interact({
						type: "Remove_Cow",
						input: {
							cowModel: cowModel!,
							successCallback() {
								notifier.interact({
									type: "Notify",
									input: {
										text: `${name} successfully removed`,
										variant: "success",
									},
								});
								livestockTableModel.interact({
									type: "RESET_SELECTED_COW",
									input: {
										currentModelView:
											livestockTableModel.modelView!,
									},
								});
							},
							failureCallback(error) {
								notifier.interact({
									type: "Notify",
									input: {
										text: `Could not remove cow. Error: ${error}`,
										variant: "failure",
									},
								});
							},
						},
					});
					return {
						cattleRepositoryModel,
						cowModel,
						livestockTableModel,
						shown: false,
					};
				}
			}
		},
	};
}
