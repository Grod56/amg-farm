import { Location } from "@/lib/types/miscellaneous";
import { CowModelView, CowType } from "@/lib/types/models/cow";
import {
	InitializedModel,
	InputModelInteraction,
	InteractiveModel,
	ModelInteraction,
} from "@mvc-react/mvc";

export interface AddCowDialogModelView {
	shown: boolean;
	location: Location;
	allLocations: Location[];
	cowTypes: { type: CowType }[];
}

export type AddCowDialogModelInteraction =
	| ModelInteraction<"CLOSE">
	| InputModelInteraction<
			"OPEN",
			{
				defaultLocation: Location;
				locations: Location[];
				cowTypes: { type: CowType }[];
			}
	  >
	| InputModelInteraction<
			"SUBMIT",
			{
				cowToBeAdded: Omit<CowModelView, "id">;
			}
	  >;

export type AddCowDialogModel = InitializedModel<
	InteractiveModel<AddCowDialogModelView, AddCowDialogModelInteraction>
>;
