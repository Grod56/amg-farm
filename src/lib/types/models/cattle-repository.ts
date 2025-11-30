import { Location } from "@/lib/types/miscellaneous";
import { InputModelInteraction } from "@mvc-react/mvc";
import {
	RepositoryModel,
	RepositoryModelInteraction,
} from "../../utilities/repositories/repository-model";
import { CowModel, CowModelView, CowType } from "./cow";

export interface CattleRepositoryModelView {
	cowModels: CowModel[];
	activeLocations: Location[];
	allLocations: Location[];
	cowTypes: { type: CowType }[];
}

export type CattleRepositoryModelInteraction =
	| RepositoryModelInteraction
	| InputModelInteraction<
			"ADD_COW",
			{
				cowToBeAdded: Omit<CowModelView, "id">;
				successCallback: () => void;
				failureCallback: (error: unknown) => void;
			}
	  >
	| InputModelInteraction<
			"EDIT_COW",
			{
				updatedCow: CowModel;
				successCallback: () => void;
				failureCallback: (error: unknown) => void;
			}
	  >
	| InputModelInteraction<
			"REMOVE_COW",
			{
				cowToBeRemoved: CowModel;
				successCallback: () => void;
				failureCallback: (error: unknown) => void;
			}
	  >;

export type CattleRepositoryModel = RepositoryModel<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
>;
