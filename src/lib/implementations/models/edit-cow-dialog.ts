import {
	EditCowDialogModelView,
	EditCowDialogModelInteraction,
} from "@/lib/components/form/edit-cow/edit-cow-dialog-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function editCowDialogVIInterface(): ViewInteractionInterface<
	EditCowDialogModelView,
	EditCowDialogModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "TOGGLE_DIALOG": {
					const {
						cattleRepositoryModel,
						shown,
						cowModel,
						locations,
						cowTypes,
						livestockTableModel,
					} = interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						cowModel,
						locations,
						cowTypes,
						livestockTableModel,
						shown: !shown,
					};
				}
				case "SUBMIT": {
					const { currentDialogModelView, updatedCow } =
						interaction.input;
					const {
						cattleRepositoryModel,
						locations,
						cowTypes,
						livestockTableModel,
					} = currentDialogModelView;
					const { name } = updatedCow.modelView;
					const { modelView: livestockTableModelView } =
						livestockTableModel;
					const { notifier } = livestockTableModelView;
					notifier.interact({
						type: "NOTIFY",
						input: { notification: { type: "pending" } },
					});
					cattleRepositoryModel.interact({
						type: "EDIT_COW",
						input: {
							updatedCow: updatedCow,
							successCallback() {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `${name} successfully modified`,
											type: "success",
										},
									},
								});
								livestockTableModel.interact({
									type: "RESET_SELECTED_COW",
									input: {
										currentModelView:
											livestockTableModelView,
									},
								});
							},
							failureCallback(error) {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `Could not update cow. Error: ${error}`,
											type: "failure",
										},
									},
								});
							},
						},
					});
					return {
						cattleRepositoryModel,
						cowModel: updatedCow,
						locations,
						cowTypes,
						livestockTableModel,
						shown: false,
					};
				}
			}
		},
	};
}
