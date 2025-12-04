import { ModelView } from "@mvc-react/mvc";
import {
	StatifiableModel,
	useTransformedStatefulInteractiveModel,
} from "@mvc-react/stateful";
import { useEffect } from "react";
import {
	RepositoryModelInteraction,
	RepositoryInteractionType,
} from "./repository-model";

export function useStatefulRepository<V extends ModelView>(
	statifiableModel: StatifiableModel<V, RepositoryModelInteraction>,
) {
	const model = useTransformedStatefulInteractiveModel(statifiableModel);

	useEffect(() => {
		if (!model.modelView)
			model.interact({ type: RepositoryInteractionType.RETRIEVE });
	}, [model]);

	return model;
}
