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
	retrieveAllCowTypes,
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
				const cowTypes = await retrieveAllCowTypes();

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
					cowTypes,
				};
			}
			case "ADD_COW": {
				const { cowToBeAdded, successCallback, failureCallback } =
					interaction.input;
				await addCow(cowToBeAdded)
					.then(successCallback)
					.catch(error => {
						failureCallback(error);
						return Promise.reject(error);
					});
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
			case "REMOVE_COW": {
				const { cowToBeRemoved, successCallback, failureCallback } =
					interaction.input;
				await removeCow(cowToBeRemoved)
					.then(successCallback)
					.catch(error => {
						failureCallback(error);
						return Promise.reject(error);
					});
				return await this.produceModelView({
					type: RepositoryInteractionType.RETRIEVE,
				});
			}
			case "EDIT_COW": {
				const { updatedCow, successCallback, failureCallback } =
					interaction.input;
				await editCow(updatedCow)
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
