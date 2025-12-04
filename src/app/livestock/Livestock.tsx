"use client";

import LivestockTable from "@/lib/components/livestock-table/LivestockTable";
import NotificationToast from "@/lib/components/notification-toast/NotificationToast";
import { livestockTableVIInterface } from "@/lib/implementations/models/livestock-table";
import { notificationToastVIInterface } from "@/lib/implementations/models/notification-toast";
import {
	useInitializedStatefulInteractiveModel,
	useNewStatefulInteractiveModel,
} from "@mvc-react/stateful";
import Spinner from "react-bootstrap/Spinner";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { ToastNotificationType } from "@/lib/components/notification-toast/notification-toast-model";
import AddCowDialog from "@/lib/components/form/add-cow/AddCowDialog";
import EditCowDialog from "@/lib/components/form/edit-cow/EditCowDialog";
import RemoveCowDialog from "@/lib/components/form/remove-cow/RemoveCowDialog";
import { addCowDialogVIInterface } from "@/lib/implementations/models/add-cow-dialog";
import { editCowDialogVIInterface } from "@/lib/implementations/models/edit-cow-dialog";
import { removeCowDialogVIInterface } from "@/lib/implementations/models/remove-cow-dialog";
import { cattleRepositoryViewInteractionInterface } from "@/lib/implementations/repositories/cattle-repository";
import { useStatefulRepository } from "@/lib/utilities/repositories/use-repository";
import { ConditionalComponent } from "@mvc-react/components";
import { newReadonlyModel } from "@mvc-react/mvc";
import { Location } from "@/lib/types/miscellaneous";
import { CowModel } from "@/lib/types/models/cow";
import "./livestock.css";

export type LivestockNotificationType = "success" | "pending" | "failure";

const Livestock = function () {
	const notifier = useInitializedStatefulInteractiveModel(
		notifierVIInterface<LivestockNotificationType>(),
		{ notification: null },
	);
	const { notification } = notifier.modelView;
	const notificationToast = useInitializedStatefulInteractiveModel(
		notificationToastVIInterface(notifier),
		{
			notification,
			typeToToastTypeMap: new Map<
				LivestockNotificationType,
				ToastNotificationType
			>([
				["success", "success"],
				["failure", "failure"],
			]),
			open: false,
			wasDisplayed: false,
		},
	);
	const cattleRepository = useStatefulRepository({
		modelView: null,
		viewInteractionInterface: cattleRepositoryViewInteractionInterface,
	});
	const { modelView: repositoryModelView } = cattleRepository;
	const submitSuccessCallback = () => {
		livestockTable.interact({ type: "RESET_SELECTED_COW" });
	};
	const addCowCallback = (defaultLocation: Location) => {
		addCowDialog.interact({
			type: "OPEN",
			input: {
				defaultLocation: defaultLocation,
				locations: repositoryModelView!.allLocations,
				cowTypes: repositoryModelView!.cowTypes,
			},
		});
	};
	const removeCowCallback = (cow: CowModel) => {
		removeCowDialog.interact({
			type: "OPEN",
			input: {
				cowToBeRemoved: cow,
			},
		});
	};
	const editCowCallback = (cow: CowModel) => {
		editCowDialog.interact({
			type: "OPEN",
			input: {
				cowToBeEdited: cow,
				cowTypes: repositoryModelView!.cowTypes,
				locations: repositoryModelView!.allLocations,
			},
		});
	};
	const livestockTable = useInitializedStatefulInteractiveModel(
		livestockTableVIInterface(),
		{
			notification,
			cattleRepositoryModelView: repositoryModelView,
			addCowCallback,
			editCowCallback,
			removeCowCallback,
		},
	);
	const { selectedCow, selectedLocation } = livestockTable.modelView;
	const addCowDialog = useNewStatefulInteractiveModel(
		addCowDialogVIInterface(
			cattleRepository,
			notifier,
			submitSuccessCallback,
		),
	);
	const editCowDialog = useNewStatefulInteractiveModel(
		editCowDialogVIInterface(
			cattleRepository,
			notifier,
			submitSuccessCallback,
		),
	);
	const removeCowDialog = useNewStatefulInteractiveModel(
		removeCowDialogVIInterface(
			cattleRepository,
			notifier,
			submitSuccessCallback,
		),
	);

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
								...livestockTable.modelView,
								cattleRepositoryModelView: repositoryModelView,
								notification,
								addCowCallback,
								editCowCallback,
								removeCowCallback,
							},
							interact: livestockTable.interact,
						}}
					/>
				</div>
			</div>
			<NotificationToast
				model={{
					// NOTE: Seems like if there's sub-model state it has to be specified explicitly
					modelView: { ...notificationToast.modelView, notification },
					interact: notificationToast.interact,
				}}
			/>
			<ConditionalComponent
				model={newReadonlyModel({
					condition: selectedLocation,
					components: new Map([
						[null, () => <></>],
						[undefined, () => <></>],
					]),
					FallbackComponent: () => (
						<AddCowDialog
							model={{
								...addCowDialog,
								modelView: addCowDialog.modelView
									? addCowDialog.modelView
									: {
											shown: false,
											location: selectedLocation!,
											allLocations:
												repositoryModelView!
													.allLocations,
											cowTypes:
												repositoryModelView!.cowTypes,
										},
							}}
						/>
					),
				})}
			/>
			{/* {selectedCow && (
				<EditCowDialog
					model={{
						...editCowDialogModel,
						modelView: editCowDialogModel.modelView
							? editCowDialogModel.modelView
							: {
									cowModel: selectedCow!,
									shown: false,
									cattleRepositoryModel,
									livestockTableModel: model,
									locations:
										cattleRepositoryModel.modelView!
											.allLocations,
								},
					}}
				/>
			)} */}
			<ConditionalComponent
				model={newReadonlyModel({
					condition: selectedCow,
					components: new Map([
						[null, () => <></>],
						[undefined, () => <></>],
					]),
					FallbackComponent: () => (
						<EditCowDialog
							model={{
								...editCowDialog,
								modelView: editCowDialog.modelView
									? editCowDialog.modelView
									: {
											cow: selectedCow!,
											shown: false,
											locations:
												repositoryModelView!
													.allLocations,
											cowTypes:
												repositoryModelView!.cowTypes,
										},
							}}
						/>
					),
				})}
			/>
			<ConditionalComponent
				model={newReadonlyModel({
					condition: selectedCow,
					components: new Map([
						[null, () => <></>],
						[undefined, () => <></>],
					]),
					FallbackComponent: () => (
						<RemoveCowDialog
							model={{
								...removeCowDialog,
								modelView: removeCowDialog.modelView
									? removeCowDialog.modelView
									: {
											cow: selectedCow!,
											shown: false,
										},
							}}
						/>
					),
				})}
			/>
		</>
	);
};

export default Livestock;
