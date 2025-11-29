import { Location } from "@/lib/types/miscellaneous";
import { CowType } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface EditCowFormModelView {
	name: string;
	dob: Date;
	type: string;
	tag: string;
	selectedLocation: Location;
	locations: Location[];
	cowTypes: { type: CowType }[];
}

export type EditCowFormModelInteraction =
	| InputModelInteraction<
			"Update_Form",
			{ updatedFormModelView: EditCowFormModelView }
	  >
	| ModelInteraction<"Clear_Form">;

export type EditCowFormModel = InitializedModel<
	InteractiveModel<EditCowFormModelView, EditCowFormModelInteraction>
>;
