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
					} = interaction.input.currentDialogModelView;
					return {
						cattleRepositoryModel,
						cowModel,
						locations,
						shown: !shown,
					};
				}
				case "Submit": {
					const { currentDialogModelView, currentFormModelView } =
						interaction.input;
					const { cattleRepositoryModel, locations, cowModel } =
						currentDialogModelView;
					const { name, selectedLocation, type, tag, dob } =
						currentFormModelView;
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
						},
					});
					return {
						cattleRepositoryModel,
						cowModel: newCowModel,
						locations,
						shown: false,
					};
				}
			}
		},
	};
}
