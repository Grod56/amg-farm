import {
	RemoveCowDialogModelView,
	RemoveCowDialogModelInteraction,
} from "@/lib/components/form/remove-cow/remove-cow-dialog-model";
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
					const { notifier: notifier } =
						livestockTableModel.modelView;
					notifier.interact({
						type: "NOTIFY",
						input: { notification: { type: "pending" } },
					});
					cattleRepositoryModel.interact({
						type: "REMOVE_COW",
						input: {
							cowToBeRemoved: cowModel!,
							successCallback() {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `${name} successfully removed`,
											type: "success",
										},
									},
								});
								livestockTableModel.interact({
									type: "RESET_SELECTED_COW",
									input: {
										currentModelView:
											livestockTableModel.modelView,
									},
								});
							},
							failureCallback(error) {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `Could not remove cow. Error: ${error}`,
											type: "failure",
										},
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
