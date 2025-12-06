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
		produceModelView: async (interaction, currentDialogModelView) => {
			switch (interaction.type) {
				case "OPEN": {
					const { initialFormModelView, formTools } =
						interaction.input;
					return {
						shown: true,
						initialFormModelView,
						formTools,
					};
				}
				case "CLOSE": {
					if (!currentDialogModelView)
						throw new Error("Model view is uninitialized");
					return { ...currentDialogModelView, shown: false };
				}
			}
		},
	};
}
