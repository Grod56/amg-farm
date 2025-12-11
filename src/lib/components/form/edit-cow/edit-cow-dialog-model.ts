import { EditCowFormTools } from "@/lib/implementations/models/edit-cow-form";
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
	cowToBeEdited: CowModel;
	locations: Location[];
	cowTypes: { type: CowType }[];
	formTools: EditCowFormTools;
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
	  >;
export type EditCowDialogModel = InitializedModel<
	InteractiveModel<EditCowDialogModelView, EditCowDialogModelInteraction>
>;
