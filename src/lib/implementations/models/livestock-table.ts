import { LivestockTableModel } from "@/lib/components/livestock-table/livestock-table-model";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import {
	LivestockTableModelInteraction,
	LivestockTableModelView,
} from "./../../components/livestock-table/livestock-table-model";

export function useLivestockTableModel(): LivestockTableModel {
	const statefulModel = useInitializedStatefulInteractiveModel(
		{
			async produceModelView(
				interaction: LivestockTableModelInteraction,
			): Promise<LivestockTableModelView> {
				switch (interaction.type) {
					case "Change_Location": {
						const { currentModelView, location } =
							interaction.input;
						return {
							...currentModelView,
							selectedLocation: location,
						};
					}
				}
			},
		},
		{},
	);

	return statefulModel;
}
