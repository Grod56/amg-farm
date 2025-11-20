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
					const { cattleRepositoryModel, shown, location } =
						interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						location,
						shown: !shown,
					};
				}
				case "Submit": {
					const { cattleRepositoryModel, location } =
						interaction.input.currentDialogModelView;
					cattleRepositoryModel.interact({
						type: "Add_Cow",
						input: { form: interaction.input.currentFormModelView },
					});
					return {
						cattleRepositoryModel,
						location,
						shown: false,
					};
				}
			}
		},
	};
}
