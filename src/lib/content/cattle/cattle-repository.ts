import { InputModelInteraction } from "@mvc-react/mvc";
import {
	RepositoryModel,
	RepositoryModelInteraction,
} from "../../utilities/repositories/repository-model";
import { CowModel } from "./cow-model";
import { AddCowFormModelView } from "@/lib/components/livestock-table/table-actions/add-cow/add-cow-form/add-cow-form-model";
import { Location } from "@/lib/types/miscellaneous";

export interface CattleRepositoryModelView {
	cowModels: CowModel[];
	activeLocations: Location[];
	allLocations: Location[];
}

export type CattleRepositoryModelInteraction =
	| RepositoryModelInteraction
	| InputModelInteraction<
			"Add_Cow",
			{
				form: AddCowFormModelView;
				successCallback: () => void;
				failureCallback: (error: unknown) => void;
			}
	  >
	| InputModelInteraction<
			"Edit_Cow",
			{
				cowModel: CowModel;
				successCallback: () => void;
				failureCallback: (error: unknown) => void;
			}
	  >
	| InputModelInteraction<
			"Remove_Cow",
			{
				cowModel: CowModel;
				successCallback: () => void;
				failureCallback: (error: unknown) => void;
			}
	  >;

export type CattleRepositoryModel = RepositoryModel<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
>;
