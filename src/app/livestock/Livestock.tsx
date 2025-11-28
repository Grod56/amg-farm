"use client";

import LivestockTable from "@/lib/components/livestock-table/LivestockTable";
import NotificationToast from "@/lib/components/notification-toast/NotificationToast";
import { livestockTableVIInterface } from "@/lib/implementations/models/livestock-table";
import { notificationToastVIInterface } from "@/lib/implementations/models/notification-toast";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import Spinner from "react-bootstrap/Spinner";
import "./livestock.css";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { ToastNotificationType } from "@/lib/components/notification-toast/notification-toast-model";

export type LivestockNotificationType = "success" | "pending" | "failure";

const Livestock = function () {
	const notifier = useInitializedStatefulInteractiveModel(
		notifierVIInterface<LivestockNotificationType>(),
		{ notification: null },
	);
	const notificationToast = useInitializedStatefulInteractiveModel(
		notificationToastVIInterface(),
		{
			notifier,
			notificationMap: new Map<
				LivestockNotificationType,
				ToastNotificationType
			>([
				["success", "success"],
				["failure", "failure"],
			]),
			shown: false,
		},
	);
	const livestockTableModel = useInitializedStatefulInteractiveModel(
		livestockTableVIInterface(),
		{
			notifier,
		},
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
					<LivestockTable
						model={{
							modelView: {
								...livestockTableModel.modelView,
								notifier: {
									modelView: notifier.modelView,
									interact(interaction) {
										switch (interaction.type) {
											case "NOTIFY": {
												notificationToast.interact({
													type: "Notify",
													input: {
														notification:
															interaction.input
																.notification,
														currentModelView:
															notificationToast.modelView,
													},
												});
											}
										}
									},
								},
							},
							interact: livestockTableModel.interact,
						}}
					/>
				</div>
			</div>
			<NotificationToast
				model={{
					// NOTE: Seems like sub-model with state has to be explicitly stated
					modelView: { ...notificationToast.modelView, notifier },
					interact: notificationToast.interact,
				}}
			/>
		</>
	);
};

export default Livestock;
