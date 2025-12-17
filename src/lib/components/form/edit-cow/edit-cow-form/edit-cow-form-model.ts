import { Location } from "@/lib/types/miscellaneous";
import { CowModel, CowType } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
} from "@mvc-react/mvc";

export type EditCowFormFields = {
	name: string;
	dob: Date;
	type: string;
	tag: string;
	location: Location;
};

export interface EditCowFormModelView {
	fields: EditCowFormFields;
	cowToBeEdited: CowModel;
	locations: Location[];
	cowTypes: { type: CowType }[];
}

export type EditCowFormModelInteraction =
	| InputModelInteraction<
			"UPDATE_FORM",
			{ updatedFormFields: EditCowFormFields }
	  >
	| InputModelInteraction<
			"SUBMIT",
			{
				updatedCow: CowModel;
				pendingCallback?: () => void | Promise<void>;
				successCallback?: () => void | Promise<void>;
				failureCallback?: (error: unknown) => void | Promise<void>;
			}
	  >;

export type EditCowFormModel = InitializedModel<
	InteractiveModel<EditCowFormModelView, EditCowFormModelInteraction>
>;
