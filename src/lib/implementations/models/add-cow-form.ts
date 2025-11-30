import {
	AddCowFormModelView,
	AddCowFormModelInteraction,
} from "@/lib/components/form/add-cow/add-cow-form/add-cow-form-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function addCowFormVIInterface(): ViewInteractionInterface<
	AddCowFormModelView,
	AddCowFormModelInteraction
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
						location: { id: "", name: "" },
						dob: new Date(),
						cowTypes: [], // HACK
						allLocations: [],
					};
			}
		},
	};
}
