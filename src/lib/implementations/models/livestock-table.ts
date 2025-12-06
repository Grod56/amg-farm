import { ViewInteractionInterface } from "@mvc-react/stateful";
import {
	LivestockTableModelInteraction,
	LivestockTableModelView,
} from "./../../components/livestock-table/livestock-table-model";
import { Location } from "@/lib/types/miscellaneous";
import { CowModel } from "@/lib/types/models/cow";

export function livestockTableVIInterface(
	addCowCallback: (defaultLocation: Location) => void,
	editCowCallback: (cow: CowModel) => void,
	removeCowCallback: (cow: CowModel) => void,
): ViewInteractionInterface<
	LivestockTableModelView,
	LivestockTableModelInteraction
> {
	return {
		async produceModelView(
			interaction,
			currentModelView,
		): Promise<LivestockTableModelView> {
			switch (interaction.type) {
				case "CHANGE_LOCATION": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					const { location: location } = interaction.input;
					return {
						...currentModelView,
						selectedLocation: location,
						selectedCow: undefined,
					};
				}
				case "SELECT_COW": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					const { cow: cowModel } = interaction.input;
					return {
						...currentModelView,
						selectedCow: cowModel,
					};
				}
				case "RESET_SELECTED_COW": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					return {
						...currentModelView,
						selectedCow: undefined,
					};
				}
				case "ADD_COW": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					const { defaultLocation } = interaction.input;
					addCowCallback(defaultLocation);
					return currentModelView;
				}
				case "EDIT_COW": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					const { cow } = interaction.input;
					editCowCallback(cow);
					return currentModelView;
				}
				case "REMOVE_COW": {
					if (!currentModelView)
						throw new Error("Model view is uninitialized");
					const { cow } = interaction.input;
					removeCowCallback(cow);
					return currentModelView;
				}
			}
		},
	};
}
