import { CowModelView } from "@/lib/types/models/cow";
import {
	CattleRepositoryModelInteraction,
	CattleRepositoryModelView,
} from "@/lib/types/models/cattle-repository";
import { RepositoryInteractionType } from "@/lib/utilities/repositories/repository-model";
import { newReadonlyModel } from "@mvc-react/mvc";
import { ViewInteractionInterface } from "@mvc-react/stateful";
import {
	addCow,
	editCow,
	removeCow,
	retrieveAllLocations,
	retrieveCattle,
} from "./server-actions";

export const cattleRepositoryViewInteractionInterface: ViewInteractionInterface<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
> = {
	async produceModelView(interaction: CattleRepositoryModelInteraction) {
		switch (interaction.type) {
			case RepositoryInteractionType.RETRIEVE: {
				const records = await retrieveCattle();
				const allLocations = await retrieveAllLocations();
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
					activeLocations: [
						...new Set(
							records.map(record => ({
								id: record.location_id,
								name: record.location_name,
							})),
						),
					],
					allLocations,
				};
			}
			case "Add_Cow": {
				const {
					cowToBeAdded: form,
					successCallback,
					failureCallback,
				} = interaction.input;
				await addCow(form)
					.then(successCallback)
					.catch(error => {
						failureCallback(error);
						return Promise.reject(error);
					});
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
			case "Remove_Cow": {
				const {
					cowToBeRemoved: cowModel,
					successCallback,
					failureCallback,
				} = interaction.input;
				await removeCow(cowModel)
					.then(successCallback)
					.catch(error => {
						failureCallback(error);
						return Promise.reject(error);
					});
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
			case "Edit_Cow": {
				const {
					updatedCow: cowModel,
					successCallback,
					failureCallback,
				} = interaction.input;
				await editCow(cowModel)
					.then(successCallback)
					.catch(error => {
						failureCallback(error);
						return Promise.reject(error);
					});
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
		}
	},
};
