import { ViewInteractionInterface } from "@mvc-react/stateful";
import {
	LivestockTableModelInteraction,
	LivestockTableModelView,
} from "./../../components/livestock-table/livestock-table-model";

export function livestockTableVIInterface(): ViewInteractionInterface<
	LivestockTableModelView,
	LivestockTableModelInteraction
> {
	return {
		async produceModelView(
			interaction: LivestockTableModelInteraction,
		): Promise<LivestockTableModelView> {
			switch (interaction.type) {
				case "CHANGE_LOCATION": {
					const { currentModelView, location: location } =
						interaction.input;
					return {
						...currentModelView,
						selectedLocation: location,
						selectedCow: undefined,
					};
				}
				case "SELECT_COW": {
					const { cowModel, currentModelView } = interaction.input;
					return {
						...currentModelView,
						selectedCow: cowModel,
					};
				}
				case "RESET_SELECTED_COW": {
					return {
						...interaction.input.currentModelView,
						selectedCow: undefined,
					};
				}
			}
		},
	};
}
