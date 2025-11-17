import {
	AddCowFormModelInteraction,
	AddCowFormModelView,
} from "@/lib/components/livestock-table/table-actions/add-cow/add-cow-form/add-cow-form-model";
import { CattleRepositoryModel } from "@/lib/content/cattle/cattle-repository";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function addCowFormVIInterface(
	cattleRepositoryModel: CattleRepositoryModel,
): ViewInteractionInterface<AddCowFormModelView, AddCowFormModelInteraction> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "Update_Form":
					return interaction.input.updatedFormModelView;
				case "Submit_Form":
					cattleRepositoryModel.interact({
						type: "Add_Cow",
						input: { form: interaction.input.currentFormModelView },
					});
					// TODO: Something else
					return interaction.input.currentFormModelView;
			}
		},
	};
}
