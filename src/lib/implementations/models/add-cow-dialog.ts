import { LivestockNotificationType } from "@/app/livestock/Livestock";
import {
	AddCowDialogModelView,
	AddCowDialogModelInteraction,
} from "@/lib/components/form/add-cow/add-cow-dialog-model";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModelView } from "@/lib/types/models/cow";
import { NotifierModel } from "@/lib/types/models/notifier";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function addCowDialogVIInterface(
	cattleRepository: CattleRepositoryModel,
	notifier: NotifierModel<LivestockNotificationType>,
	successCallback?: (cow: Omit<CowModelView, "id">) => void,
	failureCallback?: (error: unknown) => void,
): ViewInteractionInterface<
	AddCowDialogModelView,
	AddCowDialogModelInteraction
> {
	return {
		produceModelView: async (interaction, currentDialogModelView) => {
			switch (interaction.type) {
				case "OPEN": {
					const { cowTypes, defaultLocation, locations } =
						interaction.input;
					return {
						shown: true,
						location: defaultLocation,
						allLocations: locations,
						cowTypes,
					};
				}
				case "CLOSE": {
					if (!currentDialogModelView)
						throw new Error("Model view is uninitialized");
					return { ...currentDialogModelView, shown: false };
				}
				case "SUBMIT": {
					if (!currentDialogModelView)
						throw new Error("Model view is uninitialized");
					const { location, cowTypes, allLocations } =
						currentDialogModelView;
					const { name } = interaction.input.cowToBeAdded;
					notifier.interact({
						type: "NOTIFY",
						input: { notification: { type: "pending" } },
					});
					cattleRepository.interact({
						type: "ADD_COW",
						input: {
							cowToBeAdded: interaction.input.cowToBeAdded,
							successCallback() {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `${name} successfully added`,
											type: "success",
										},
									},
								});
								successCallback?.(
									interaction.input.cowToBeAdded,
								);
							},
							failureCallback(error) {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `Could not add cow. Error: ${error}`,
											type: "failure",
										},
									},
								});
								failureCallback?.(error);
							},
						},
					});
					return {
						location,
						cowTypes,
						allLocations,
						shown: false,
					};
				}
			}
		},
	};
}
