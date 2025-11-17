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
					const {
						cattleRepositoryModel,
						shown,
						locationNames: locations,
					} = interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						locationNames: locations,
						shown: !shown,
					};
				}
			}
		},
	};
}
