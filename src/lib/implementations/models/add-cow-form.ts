import { LivestockNotificationType } from "@/app/livestock/Livestock";
import {
	AddCowFormModelView,
	AddCowFormModelInteraction,
} from "@/lib/components/form/add-cow/add-cow-form/add-cow-form-model";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModelView } from "@/lib/types/models/cow";
import { NotifierModel } from "@/lib/types/models/notifier";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export type AddCowFormTools = {
	cattleRepository: CattleRepositoryModel;
	notifier: NotifierModel<LivestockNotificationType>;
	successCallback?: (cow: Omit<CowModelView, "id">) => void;
	failureCallback?: (error: unknown) => void;
};

export function addCowFormVIInterface({
	cattleRepository,
	notifier,
	successCallback,
	failureCallback,
}: AddCowFormTools): ViewInteractionInterface<
	AddCowFormModelView,
	AddCowFormModelInteraction
> {
	return {
		produceModelView: async (interaction, currentModelView) => {
			switch (interaction.type) {
				case "UPDATE_FORM": {
					if (!currentModelView)
						throw new Error("Form model view is uninitialized");
					return {
						...currentModelView,
						fields: interaction.input.updatedFormFields,
					};
				}
				case "SUBMIT": {
					if (!currentModelView)
						throw new Error("Form model view is uninitialized");
					const {
						cowToBeAdded,
						failureCallback: formFailureCallback,
						pendingCallback: formPendingCallback,
						successCallback: formSuccessCallback,
					} = interaction.input;
					const { name } = cowToBeAdded;

					formPendingCallback?.();
					notifier.interact({
						type: "NOTIFY",
						input: { notification: { type: "pending" } },
					});
					cattleRepository.interact({
						type: "ADD_COW",
						input: {
							cowToBeAdded: interaction.input.cowToBeAdded,
							successCallback() {
								formSuccessCallback?.();
								successCallback?.(
									interaction.input.cowToBeAdded,
								);
								notifier.interact({
									type: "NOTIFY",
									input: {
										notification: {
											text: `${name} successfully added`,
											type: "success",
										},
									},
								});
							},
							failureCallback(error) {
								formFailureCallback?.(error);
								failureCallback?.(error);
								notifier.interact({
									type: "CLEAR",
								});
							},
						},
					});
					return {
						...currentModelView,
					};
				}
			}
		},
	};
}
