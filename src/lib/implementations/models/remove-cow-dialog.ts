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
					const { cattleRepositoryModel, shown, cowModel } =
						interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						cowModel,
						shown: !shown,
					};
				}
				case "REMOVE_COW": {
					const { cattleRepositoryModel, cowModel } =
						interaction.input.currentDialogModelView;
					cattleRepositoryModel.interact({
						type: "Remove_Cow",
						input: { cowModel: cowModel! },
					});
					return {
						cattleRepositoryModel,
						cowModel,
						shown: false,
					};
				}
			}
		},
	};
}
