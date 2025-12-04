import { Location } from "@/lib/types/miscellaneous";
import { CowModel, CowType } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface EditCowDialogModelView {
	shown: boolean;
	cow: CowModel;
	locations: Location[];
	cowTypes: { type: CowType }[];
}

export type EditCowDialogModelInteraction =
	| ModelInteraction<"CLOSE">
	| InputModelInteraction<
			"OPEN",
			{
				cowToBeEdited: CowModel;
				locations: Location[];
				cowTypes: { type: CowType }[];
			}
	  >
	| InputModelInteraction<
			"SUBMIT",
			{
				updatedCow: CowModel;
			}
	  >;

export type EditCowDialogModel = InitializedModel<
	InteractiveModel<EditCowDialogModelView, EditCowDialogModelInteraction>
>;
