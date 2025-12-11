import {
	EditCowFormModelInteraction,
	EditCowFormModelView,
} from "@/lib/components/form/edit-cow/edit-cow-form/edit-cow-form-model";
import { CattleRepositoryModel } from "@/lib/types/models/cattle-repository";
import { CowModel } from "@/lib/types/models/cow";
import { ViewInteractionInterface } from "@mvc-react/stateful";

export type EditCowFormTools = {
	cattleRepository: CattleRepositoryModel;
	successCallback?: (updatedCow: CowModel) => void;
	failureCallback?: (error: unknown) => void;
	pendingCallback?: () => void;
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

					formPendingCallback?.();
					pendingCallback?.();
					cattleRepository.interact({
						type: "EDIT_COW",
						input: {
							updatedCow: updatedCow,
							successCallback() {
								formSuccessCallback?.();
								successCallback?.(updatedCow);
							},
							failureCallback(error) {
								formFailureCallback?.(error);
								failureCallback?.(error);
							},
						},
					});
					return currentModelView;
				}
			}
		},
	};
}
