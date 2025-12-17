import {
	EditCowFormModelInteraction,
	EditCowFormModelView,
} from "@/lib/components/form/edit-cow/edit-cow-form/edit-cow-form-model";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export type EditCowFormTools = {
	cattleRepository: CattleRepositoryModel;
	successCallback?: (updatedCow: CowModel) => void | Promise<void>;
	failureCallback?: (error: unknown) => void | Promise<void>;
	pendingCallback?: () => void | Promise<void>;
};

export function editCowFormVIInterface({
	cattleRepository,
	successCallback,
	failureCallback,
	pendingCallback,
}: EditCowFormTools): ViewInteractionInterface<
	EditCowFormModelView,
	EditCowFormModelInteraction
> {
	return {
		produceModelView: async (interaction, currentModelView) => {
			switch (interaction.type) {
				case "UPDATE_FORM":
					if (!currentModelView)
						throw new Error("Form model view is uninitialized");
					return {
						...currentModelView,
						fields: interaction.input.updatedFormFields,
					};
				case "SUBMIT": {
					if (!currentModelView)
						throw new Error("Form model view is uninitialized");
					const {
						updatedCow,
						failureCallback: formFailureCallback,
						pendingCallback: formPendingCallback,
						successCallback: formSuccessCallback,
					} = interaction.input;

					await formPendingCallback?.();
					await pendingCallback?.();
					await cattleRepository.interact({
						type: "EDIT_COW",
						input: {
							updatedCow: updatedCow,
							async successCallback() {
								await formSuccessCallback?.();
								await successCallback?.(updatedCow);
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
