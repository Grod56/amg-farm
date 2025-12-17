import {
	AddCowFormModelInteraction,
	AddCowFormModelView,
} from "@/lib/components/form/add-cow/add-cow-form/add-cow-form-model";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModelView } from "@/lib/types/models/cow";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export type AddCowFormTools = {
	cattleRepository: CattleRepositoryModel;
	successCallback?: (cow: Omit<CowModelView, "id">) => void | Promise<void>;
	failureCallback?: (error: unknown) => void | Promise<void>;
	pendingCallback?: () => void | Promise<void>;
};

export function addCowFormVIInterface({
	cattleRepository,
	pendingCallback,
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

					await formPendingCallback?.();
					await pendingCallback?.();
					await cattleRepository.interact({
						type: "ADD_COW",
						input: {
							cowToBeAdded: cowToBeAdded,
							async successCallback() {
								await formSuccessCallback?.();
								await successCallback?.(cowToBeAdded);
							},
							async failureCallback(error) {
								await formFailureCallback?.(error);
								await failureCallback?.(error);
							},
						},
					});
					return currentModelView;
				}
			}
		},
	};
}
