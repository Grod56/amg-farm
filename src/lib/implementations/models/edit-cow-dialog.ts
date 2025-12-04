import { LivestockNotificationType } from "@/app/livestock/Livestock";
import {
	EditCowDialogModelView,
	EditCowDialogModelInteraction,
} from "@/lib/components/form/edit-cow/edit-cow-dialog-model";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
import { NotifierModel } from "@/lib/types/models/notifier";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function editCowDialogVIInterface(
	cattleRepository: CattleRepositoryModel,
	notifier: NotifierModel<LivestockNotificationType>,
	successCallback?: (updatedCow: CowModel) => void,
	failureCallback?: (error: unknown) => void,
): ViewInteractionInterface<
	EditCowDialogModelView,
	EditCowDialogModelInteraction
> {
	return {
		produceModelView: async (interaction, currentDialogModelView) => {
			switch (interaction.type) {
				case "OPEN": {
					const { cowToBeEdited, cowTypes, locations } =
						interaction.input;
					return {
						cow: cowToBeEdited,
						locations,
						cowTypes,
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
					const { updatedCow } = interaction.input;
					const { locations, cowTypes } = currentDialogModelView;
					const { name } = updatedCow.modelView;
					notifier.interact({
						type: "NOTIFY",
						input: { notification: { type: "pending" } },
					});
					cattleRepository.interact({
						type: "EDIT_COW",
						input: {
							updatedCow: updatedCow,
							successCallback() {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `${name} successfully modified`,
											type: "success",
										},
									},
								});
								successCallback?.(updatedCow);
							},
							failureCallback(error) {
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `Could not update cow. Error: ${error}`,
											type: "failure",
										},
									},
								});
								failureCallback?.(error);
							},
						},
					});
					return {
						cow: updatedCow,
						locations,
						cowTypes,
						shown: false,
					};
				}
			}
		},
	};
}
