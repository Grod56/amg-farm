import {
	EditCowFormModelView,
	EditCowFormModelInteraction,
} from "@/lib/components/form/edit-cow/edit-cow-form/edit-cow-form-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function editCowFormVIInterface(): ViewInteractionInterface<
	EditCowFormModelView,
	EditCowFormModelInteraction
> {
	return {
		produceModelView: async interaction => {
			switch (interaction.type) {
				case "UPDATE_FORM":
					return interaction.input.updatedFormModelView;
				case "CLEAR_FORM":
					return {
						name: "",
						type: "",
						tag: "",
						location: {
							id: "",
							name: "",
						},
						dob: new Date(),
						locations: [],
						cowTypes: [], // HACK
					};
			}
		},
	};
}
