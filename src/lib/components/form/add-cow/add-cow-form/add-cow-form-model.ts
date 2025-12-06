import { Location } from "@/lib/types/miscellaneous";
import { CowModelView, CowType } from "@/lib/types/models/cow";
import { NotifierModel } from "@/lib/types/models/notifier";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";

export type AddCowFormNotificationType = "submitting" | "success" | "failure";

export type AddCowFormFields = {
	name: string;
	type: string;
	tag: string;
	dob: Date;
	location: Location;
};

export interface AddCowFormModelView {
	locations: Location[];
	cowTypes: { type: CowType }[];
	fields: AddCowFormFields;
	formNotifier: NotifierModel<AddCowFormNotificationType>;
}

export type AddCowFormModelInteraction =
	| InputModelInteraction<
			"UPDATE_FORM",
			{ updatedFormFields: AddCowFormFields }
	  >
	| InputModelInteraction<
			"SUBMIT",
			{
				cowToBeAdded: Omit<CowModelView, "id">;
			}
	  >;

export type AddCowFormModel = InitializedModel<
	InteractiveModel<AddCowFormModelView, AddCowFormModelInteraction>
>;
