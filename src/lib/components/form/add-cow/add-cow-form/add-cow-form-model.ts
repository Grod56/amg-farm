import { Location } from "@/lib/types/miscellaneous";
import { CowType } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface AddCowFormModelView {
	name: string;
	dob: Date;
	type: string;
	tag: string;
	location: Location;
	allLocations: Location[];
	cowTypes: { type: CowType }[];
}

export type AddCowFormModelInteraction =
	| InputModelInteraction<
			"UPDATE_FORM",
			{ updatedFormModelView: AddCowFormModelView }
	  >
	| ModelInteraction<"CLEAR_FORM">;

export type AddCowFormModel = InitializedModel<
	InteractiveModel<AddCowFormModelView, AddCowFormModelInteraction>
>;
