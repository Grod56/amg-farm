"use client";

import LivestockTable from "@/lib/components/livestock-table/LivestockTable";
import Notifier from "@/lib/components/notifier/Notifier";
import { Variant } from "@/lib/components/notifier/notifier-model";
import { livestockTableVIInterface } from "@/lib/implementations/models/livestock-table";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";
import "./livestock.css";

const Livestock = function () {
	const notifierModel = useInitializedStatefulInteractiveModel(
		notifierVIInterface(),
		{
			text: "",
			shown: false,
			variant: "default" as Variant,
		},
	);
	const livestockTableModel = useInitializedStatefulInteractiveModel(
		livestockTableVIInterface(),
		{
			notifier: notifierModel,
		},
	);
	return (
		<>
			{/* Crazy h-0 to make everything fit together for some reason */}
			<div className="page-background grow w-full h-0 px-3 p-8 md:!pl-12 md:!pr-12">
				<div className="bg w-full h-full rounded-3xl shadow gap-8 bg-white grow flex flex-col py-8 px-4 md:w-9/10 md:min-h-80 md:mx-auto md:!pl-12 md:!pr-12">
					<div>
						<span className="text-4xl">Livestock</span>
					</div>
					<LivestockTable model={livestockTableModel} />
				</div>
			</div>
			<Notifier model={notifierModel} />
		</>
	);
};

export default Livestock;
