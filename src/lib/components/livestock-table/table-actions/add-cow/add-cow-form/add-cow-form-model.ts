import { InputModelInteraction, InteractiveModel } from "@mvc-react/mvc";

export interface AddCowFormModelView {
	name: string;
	dob: Date;
	type: string;
	tag: string;
	locationName: string;
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
