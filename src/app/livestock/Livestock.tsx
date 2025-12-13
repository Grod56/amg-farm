"use client";

import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { cattleRepositoryViewInteractionInterface } from "@/lib/implementations/repositories/cattle-repository";
import { useStatefulRepository } from "@/lib/utilities/repositories/use-repository";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import Spinner from "react-bootstrap/Spinner";
import "./livestock.css";
import LivestockContent from "./LivestockContent/LivestockContent";

export type LivestockNotificationType = "success" | "pending" | "failure";

const Livestock = function () {
	const cattleRepository = useStatefulRepository({
		modelView: null,
		viewInteractionInterface: cattleRepositoryViewInteractionInterface,
	});
	const { modelView: repositoryModelView } = cattleRepository;
	const notifier = useInitializedStatefulInteractiveModel(
		notifierVIInterface<LivestockNotificationType>(),
		{ notification: null },
	);
	const { notification } = notifier.modelView;

	return (
		<>
			{/* Crazy h-0 to make everything fit together for some reason */}
			<div className="page-background grow w-full h-0 px-3 p-8 md:pl-12! md:pr-12!">
				<div className="bg w-full h-full rounded-3xl shadow gap-8 bg-white grow flex flex-col py-8 px-4 md:w-9/10 md:min-h-80 md:mx-auto md:pl-12! md:pr-12!">
					<div className="flex gap-4 items-center">
						<span className="text-4xl">Livestock</span>
						<Spinner
							hidden={notification?.type != "pending"}
							animation="border"
							color="gray"
							className="size-6!"
						/>
					</div>
					{repositoryModelView ? (
						<LivestockContent
							model={{
								modelView: {
									cattleRepository: {
										modelView: repositoryModelView,
										interact: cattleRepository.interact,
									},
									notifier,
								},
							}}
						/>
					) : (
						<Spinner
							animation="border"
							color="black"
							className="size-16! mx-auto my-auto"
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Livestock;
