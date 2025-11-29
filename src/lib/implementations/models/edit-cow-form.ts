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
				case "Update_Form":
					return interaction.input.updatedFormModelView;
				case "Clear_Form":
					return {
						name: "",
						type: "",
						tag: "",
						selectedLocation: {
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
