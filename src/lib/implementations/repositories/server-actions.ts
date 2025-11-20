"use server";

import { AddCowFormModelView } from "@/lib/components/livestock-table/table-actions/add-cow/add-cow-form/add-cow-form-model";
import { CowRecord } from "@/lib/content/cattle/cattle-api";
import { CowModelView } from "@/lib/content/cattle/cow-model";
import neon from "@/lib/third-party/clients/neon";

export async function retrieveRecords() {
	const records = await neon()`SELECT * FROM "Cattle"`;
	return records.rows as CowRecord[];
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

export async function removeCow({ id }: CowModelView) {
	return (await neon()`DELETE FROM "CattleTable" WHERE id = ${id}`).rows;
}

export async function editCow({
	id,
	name,
	tag,
	dob,
	location,
	type,
}: CowModelView) {
	const result = await neon()`
		UPDATE "CattleTable" 
		SET name = ${name}, tag = ${tag}, dob = ${dob}, location_id = ${location.id}, type = ${type}
		WHERE id = ${id}`;
	return result.rows;
}
