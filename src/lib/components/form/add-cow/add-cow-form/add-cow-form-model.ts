import { Location } from "@/lib/types/miscellaneous";
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
}

export type AddCowFormModelInteraction =
	| InputModelInteraction<
			"Update_Form",
			{ updatedFormModelView: AddCowFormModelView }
	  >
	| ModelInteraction<"Clear_Form">;

export type AddCowFormModel = InitializedModel<
	InteractiveModel<AddCowFormModelView, AddCowFormModelInteraction>
>;
