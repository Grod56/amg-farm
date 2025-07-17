import { CattleModelView } from "@/lib/content/cattle/cattle-model";
import {
	CattleRepositoryModelInteraction,
	CattleRepositoryModelView,
} from "@/lib/content/cattle/cattle-repository";
import { RepositoryInteractionType } from "@/lib/utilities/repositories/repository-model";
import { newReadonlyModel } from "@mvc-react/mvc";
import { ViewInteractionInterface } from "@mvc-react/stateful";
import { retrieveRecords } from "./server-actions";

export const cattleRepositoryViewInteractionInterface: ViewInteractionInterface<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
> = {
	async produceModelView(interaction: CattleRepositoryModelInteraction) {
		switch (interaction.type) {
			case RepositoryInteractionType.RETRIEVE: {
				const records = await retrieveRecords();
				const locationsSet = new Set<string>(
					records.map(record => record.location),
				);
				return {
					cattleModels: records.map(record =>
						newReadonlyModel<CattleModelView>({
							id: record.id,
							name: record.name,
							type: record.type,
							tag: record.tag,
							dob: new Date(record.dob),
							location: record.location,
						}),
					),
					locations: locationsSet.keys().toArray(),
				};
			}
		}
	},
};
