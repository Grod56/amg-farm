"use client";

import LivestockTable from "@/lib/components/livestock-table/LivestockTable";
import { useLivestockTableModel } from "@/lib/implementations/models/livestock-table";

const Livestock = function () {
	const livestockTableModel = useLivestockTableModel();
	return (
		<div className="w-full h-full grow flex flex-col p-8 gap-7">
			<h2 className="text-5xl">Livestock</h2>
			<hr />
			<LivestockTable model={livestockTableModel} />
		</div>
	);
};

export default Livestock;
