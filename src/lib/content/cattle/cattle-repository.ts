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
	locations: Location[];
}

export type CattleRepositoryModelInteraction =
	| RepositoryModelInteraction
	| InputModelInteraction<"Add_Cow", { form: AddCowFormModelView }>
	| InputModelInteraction<"Edit_Cow", { cowModel: CowModel }>
	| InputModelInteraction<"Remove_Cow", { cowModel: CowModel }>;

export type CattleRepositoryModel = RepositoryModel<
	CattleRepositoryModelView,
	CattleRepositoryModelInteraction
>;
