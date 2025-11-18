import { Location } from "@/lib/types/miscellaneous";
import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

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
	| InputModelInteraction<
			"Submit_Form",
			{ currentFormModelView: AddCowFormModelView }
	  >;

export type AddCowFormModel = InteractiveModel<
	AddCowFormModelView,
	AddCowFormModelInteraction
>;
