import { CowModelView } from "@/lib/content/cattle/cow-model";
import {
	CattleRepositoryModelInteraction,
	CattleRepositoryModelView,
} from "@/lib/content/cattle/cattle-repository";
import { RepositoryInteractionType } from "@/lib/utilities/repositories/repository-model";
import { newReadonlyModel } from "@mvc-react/mvc";
import { ViewInteractionInterface } from "@mvc-react/stateful";
import { addCow, retrieveRecords } from "./server-actions";

export const cattleRepositoryViewInteractionInterface: ViewInteractionInterface<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
> = {
	async produceModelView(interaction: CattleRepositoryModelInteraction) {
		switch (interaction.type) {
			case RepositoryInteractionType.RETRIEVE: {
				const records = await retrieveRecords();
				return {
					cattleModels: records.map(record =>
						newReadonlyModel<CowModelView>({
							id: record.id,
							name: record.name,
							type: record.type,
							tag: record.tag,
							dob: new Date(record.dob),
							locationName: record.location,
						}),
					),
					locations: [
						...new Set(records.map(record => record.location)),
					],
				};
			}
			case "Add_Cow": {
				await addCow(interaction.input.form);
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
		}
	},
};
