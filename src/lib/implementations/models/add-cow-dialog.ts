import {
	AddCowDialogModelInteraction,
	AddCowDialogModelView,
} from "@/lib/components/form/add-cow/add-cow-dialog-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";
import { AddCowFormTools } from "./add-cow-form";

export function addCowDialogVIInterface(
	formTools: AddCowFormTools,
): ViewInteractionInterface<
	AddCowDialogModelView,
	AddCowDialogModelInteraction
> {
	return {
		produceModelView: async (interaction, currentModelView) => {
			switch (interaction.type) {
				case "OPEN": {
					return {
						shown: true,
						initialFormModelView:
							interaction.input.initialFormModelView,
						formTools,
					};
				}
				case "CLOSE": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					return { ...currentModelView, shown: false };
				}
			}
		},
	};
}
