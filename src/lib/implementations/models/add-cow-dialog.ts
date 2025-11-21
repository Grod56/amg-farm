import {
	AddCowDialogModelInteraction,
	AddCowDialogModelView,
} from "@/lib/components/livestock-table/table-actions/add-cow/add-cow-dialog-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function addCowDialogVIInterface(): ViewInteractionInterface<
	AddCowDialogModelView,
	AddCowDialogModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "Toggle_Dialog": {
					const { cattleRepositoryModel, shown, location, notifier } =
						interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						location,
						notifier,
						shown: !shown,
					};
				}
				case "Submit": {
					const { cattleRepositoryModel, location, notifier } =
						interaction.input.currentDialogModelView;
					const { name } = interaction.input.currentFormModelView;
					cattleRepositoryModel.interact({
						type: "Add_Cow",
						input: {
							form: interaction.input.currentFormModelView,
							successCallback() {
								notifier.interact({
									type: "Notify",
									input: {
										text: `${name} successfully added`,
										variant: "success",
									},
								});
							},
							failureCallback(error) {
								notifier.interact({
									type: "Notify",
									input: {
										text: `Could not add cow. Error: ${error}`,
										variant: "failure",
									},
								});
							},
						},
					});
					return {
						cattleRepositoryModel,
						location,
						notifier,
						shown: false,
					};
				}
			}
		},
	};
}
