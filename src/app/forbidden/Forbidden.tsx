"use client";

import { forbiddenVIInterface } from "@/lib/implementations/models/forbidden";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import { useRouter } from "next/navigation";
import { NotificationType } from "./forbidden-model";

const Forbidden = () => {
	const notifier = useInitializedStatefulInteractiveModel(
		notifierVIInterface<NotificationType>(),
		{ notification: null },
	);
	const router = useRouter();
	const { interact } = useInitializedStatefulInteractiveModel(
		forbiddenVIInterface(),
		{
			notifier,
			router,
		},
	);

	return (
		<div className="w-full grow flex items-center">
			<div className="flex w-full justify-center p-8 md:p-12">
				<div className="w-fit h-full flex items-center bg-white/90 shadow rounded-3xl p-12 md:p-14">
					<div className="flex flex-col gap-6 justify-center items-center md:flex-nowrap">
						<span className="text-2xl">Unauthorized</span>
						<p className="text-base text-center">
							Your account is not authorized to access this
							resource.
						</p>
						<button
							className="flex w-fit p-4 py-3 items-center gap-2 rounded-lg! text-white bg-gray-800 disabled:bg-gray-400"
							disabled={
								notifier.modelView.notification?.type ==
								"pending"
							}
							onClick={() => {
								interact({
									type: "SIGN_OUT",
									input: { notifier, router },
								});
							}}
						>
							Log out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Forbidden;
