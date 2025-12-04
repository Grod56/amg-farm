import { LivestockNotificationType } from "@/app/livestock/Livestock";
import {
	RemoveCowDialogModelView,
	RemoveCowDialogModelInteraction,
} from "@/lib/components/form/remove-cow/remove-cow-dialog-model";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
import { NotifierModel } from "@/lib/types/models/notifier";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function removeCowDialogVIInterface(
	cattleRepository: CattleRepositoryModel,
	notifier: NotifierModel<LivestockNotificationType>,

	successCallback?: (removedCow: CowModel) => void,
	failureCallback?: (error: unknown) => void,
): ViewInteractionInterface<
	RemoveCowDialogModelView,
	RemoveCowDialogModelInteraction
> {
	return {
		produceModelView: async (interaction, currentDialogModelView) => {
			switch (interaction.type) {
				case "OPEN": {
					const { cowToBeRemoved } = interaction.input;
					return {
						cow: cowToBeRemoved,
						shown: true,
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
					const { cow } = currentDialogModelView;
					const { name } = cow.modelView;
					notifier.interact({
						type: "NOTIFY",
						input: { notification: { type: "pending" } },
					});
					cattleRepository.interact({
						type: "REMOVE_COW",
						input: {
							cowToBeRemoved: cow,
							successCallback() {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `${name} successfully removed`,
											type: "success",
										},
									},
								});
								successCallback?.(cow);
							},
							failureCallback(error) {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `Could not remove cow. Error: ${error}`,
											type: "failure",
										},
									},
								});
								failureCallback?.(error);
							},
						},
					});
					return {
						cow,
						shown: false,
					};
				}
			}
		},
	};
}
