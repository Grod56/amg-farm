import {
	CattleRepositoryModelInteraction,
	CattleRepositoryModelView,
} from "@/lib/types/models/cattle-repository";
import { RepositoryInteractionType } from "@/lib/utilities/repositories/repository-model";
import { ViewInteractionInterface } from "@mvc-react/stateful";
import {
	addCow,
	editCow,
	getCattleRepositorySnapshot,
	removeCow,
} from "./server-actions";

export const cattleRepositoryViewInteractionInterface: ViewInteractionInterface<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
> = {
	async produceModelView(interaction: CattleRepositoryModelInteraction) {
		switch (interaction.type) {
			case RepositoryInteractionType.RETRIEVE: {
				return await getCattleRepositorySnapshot();
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
