import {
	EditCowDialogModelInteraction,
	EditCowDialogModelView,
} from "@/lib/components/form/edit-cow/edit-cow-dialog-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";
import { EditCowFormTools } from "./edit-cow-form";

export function editCowDialogVIInterface(
	formTools: EditCowFormTools,
): ViewInteractionInterface<
	EditCowDialogModelView,
	EditCowDialogModelInteraction
> {
	return {
		produceModelView: async (interaction, currentModelView) => {
			switch (interaction.type) {
				case "OPEN": {
					const { cowToBeEdited, locations, cowTypes } =
						interaction.input;
					return {
						cowToBeEdited: cowToBeEdited,
						cowTypes,
						locations,
						formTools,
						shown: true,
					};
				}
				case "CLOSE": {
					if (!currentModelView) {
						throw new Error("Model view is uninitialized");
					}
					return { ...currentModelView, shown: false };
				}
			}
		},
	};
}
