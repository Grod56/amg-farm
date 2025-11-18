"use server";

import { AddCowFormModelView } from "@/lib/components/livestock-table/table-actions/add-cow/add-cow-form/add-cow-form-model";
import { CowRecord } from "@/lib/content/cattle/cattle-api";
import neon from "@/lib/third-party/clients/neon";

export async function retrieveRecords() {
	const records = await neon()`SELECT * FROM "Cattle"`;
	return records as CowRecord[];
}

export async function addCow({
	name,
	type,
	tag,
	dob,
	location,
}: AddCowFormModelView) {
	return await neon()`
		INSERT INTO "CattleTable"(name, type, tag, dob, location_id) 
		VALUES (${name}, ${type}, ${tag}, ${dob}, ${location.id})`;
}
