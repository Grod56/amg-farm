"use client";

import LivestockTable from "@/lib/components/livestock-table/LivestockTable";
import Notifier from "@/lib/components/notifier/Notifier";
import { Variant } from "@/lib/components/notifier/notifier-model";
import { livestockTableVIInterface } from "@/lib/implementations/models/livestock-table";
import { notifierVIInterface } from "@/lib/implementations/models/notifier";
import { useInitializedStatefulInteractiveModel } from "@mvc-react/stateful";

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
			<div className="w-full h-full grow flex flex-col p-8 gap-7">
				<div>
					<h2 className="text-5xl">Livestock</h2>
					<hr />
				</div>
				<LivestockTable model={livestockTableModel} />
			</div>
			<Notifier model={notifierModel} />
		</>
	);
};

export default Livestock;
