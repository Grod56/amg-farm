import {
	AddCowDialogModelView,
	AddCowDialogModelInteraction,
} from "@/lib/components/form/add-cow/add-cow-dialog-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function addCowDialogVIInterface(): ViewInteractionInterface<
	AddCowDialogModelView,
	AddCowDialogModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "TOGGLE_DIALOG": {
					const {
						cattleRepositoryModel,
						shown,
						location,
						notifier,
						cowTypes,
						allLocations,
						livestockTableModel,
					} = interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						location,
						notifier,
						cowTypes,
						allLocations,
						livestockTableModel,
						shown: !shown,
					};
				}
				case "SUBMIT": {
					const {
						cattleRepositoryModel,
						location,
						notifier,
						cowTypes,
						allLocations,
						livestockTableModel,
					} = interaction.input.currentDialogModelView;
					const { name } = interaction.input.cowToBeAdded;
					notifier.interact({
						type: "NOTIFY",
						input: { notification: { type: "pending" } },
					});
					cattleRepositoryModel.interact({
						type: "ADD_COW",
						input: {
							cowToBeAdded: interaction.input.cowToBeAdded,
							successCallback() {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `${name} successfully added`,
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
											text: `Could not add cow. Error: ${error}`,
											type: "failure",
										},
									},
								});
							},
						},
					});
					return {
						cattleRepositoryModel,
						location,
						notifier,
						cowTypes,
						allLocations,
						livestockTableModel,
						shown: false,
					};
				}
			}
		},
	};
}
