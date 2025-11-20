import { CowModelView } from "@/lib/content/cattle/cow-model";
import {
	CattleRepositoryModelInteraction,
	CattleRepositoryModelView,
} from "@/lib/content/cattle/cattle-repository";
import { RepositoryInteractionType } from "@/lib/utilities/repositories/repository-model";
import { newReadonlyModel } from "@mvc-react/mvc";
import { ViewInteractionInterface } from "@mvc-react/stateful";
import { addCow, editCow, removeCow, retrieveRecords } from "./server-actions";

export const cattleRepositoryViewInteractionInterface: ViewInteractionInterface<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
> = {
	async produceModelView(interaction: CattleRepositoryModelInteraction) {
		switch (interaction.type) {
			case RepositoryInteractionType.RETRIEVE: {
				const records = await retrieveRecords();
				return {
					cowModels: records.map(record =>
						newReadonlyModel<CowModelView>({
							id: record.id,
							name: record.name,
							type: record.type,
							tag: record.tag,
							dob: new Date(record.dob),
							location: {
								id: record.location_id,
								name: record.location_name,
							},
						}),
					),
					locations: [
						...new Set(
							records.map(record => ({
								id: record.location_id,
								name: record.location_name,
							})),
						),
					],
				};
			}
			case "Add_Cow": {
				await addCow(interaction.input.form);
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
			case "Remove_Cow": {
				await removeCow(interaction.input.cowModel.modelView);
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
			case "Edit_Cow": {
				await editCow(interaction.input.cowModel.modelView);
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
		}
	},
};
