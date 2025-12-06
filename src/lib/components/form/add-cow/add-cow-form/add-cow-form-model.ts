import { Location } from "@/lib/types/miscellaneous";
import { CowModelView, CowType } from "@/lib/types/models/cow";
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
				pendingCallback?: () => void;
				successCallback?: () => void;
				failureCallback?: (error: unknown) => void;
			}
	  >;

export type AddCowFormModel = InitializedModel<
	InteractiveModel<AddCowFormModelView, AddCowFormModelInteraction>
>;
