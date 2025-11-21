import {
	EditCowDialogModelView,
	EditCowDialogModelInteraction,
} from "@/lib/components/livestock-table/table-actions/edit-cow/edit-cow-dialog-model";
import { CowModel } from "@/lib/content/cattle/cow-model";
import { newReadonlyModel } from "@mvc-react/mvc";
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
					const { currentDialogModelView, currentFormModelView } =
						interaction.input;
					const {
						cattleRepositoryModel,
						locations,
						cowModel,
						livestockTableModel,
					} = currentDialogModelView;
					const { name, selectedLocation, type, tag, dob } =
						currentFormModelView;
					const { modelView: livestockTableModelView } =
						livestockTableModel;
					const { notifier } = livestockTableModelView!;
					const newCowModel: CowModel = newReadonlyModel({
						id: cowModel.modelView.id,
						location: selectedLocation,
						name,
						type,
						tag,
						dob,
					});
					cattleRepositoryModel.interact({
						type: "Edit_Cow",
						input: {
							cowModel: newCowModel,
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
						cowModel: newCowModel,
						locations,
						livestockTableModel: livestockTableModel,
						shown: false,
					};
				}
			}
		},
	};
}
