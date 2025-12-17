import {
	RemoveCowDialogModelInteraction,
	RemoveCowDialogModelView,
} from "@/lib/components/form/remove-cow/remove-cow-dialog-model";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export function removeCowDialogVIInterface(
	cattleRepository: CattleRepositoryModel,
	pendingCallback?: () => void | Promise<void>,
	successCallback?: (removedCow: CowModel) => void | Promise<void>,
	failureCallback?: (error: unknown) => void | Promise<void>,
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
					await pendingCallback?.();
					await cattleRepository.interact({
						type: "REMOVE_COW",
						input: {
							cowToBeRemoved: cow,
							async successCallback() {
								await successCallback?.(cow);
							},
							async failureCallback(error) {
								await failureCallback?.(error);
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
