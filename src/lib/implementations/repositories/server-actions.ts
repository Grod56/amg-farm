"use server";

import { AddCowFormModelView } from "@/lib/components/livestock-table/table-actions/add-cow/add-cow-form/add-cow-form-model";
import { CowRecord } from "@/lib/content/cattle/cattle-api";
import { CowModel } from "@/lib/content/cattle/cow-model";
import neon from "@/lib/third-party/clients/neon";
import { Location } from "@/lib/types/miscellaneous";

export async function retrieveCattle() {
	const records = await neon()`SELECT * FROM "Cattle"`;
	return records.rows.map(record => ({
		...record,
		tag: record.tag == null ? "" : record.tag,
	})) as CowRecord[];
}

export async function retrieveAllLocations() {
	const records = await neon()`SELECT * FROM "Location"`;
	return records.rows as Location[];
}

export async function addCow({
	name,
	type,
	tag,
	dob,
	location,
}: AddCowFormModelView) {
	const processedTag = tag == "" ? null : tag;
	return (
		await neon()`
		INSERT INTO "CattleTable"(name, type, tag, dob, location_id) 
		VALUES (${name}, ${type}, ${processedTag}, ${dob}, ${location.id})`
	).rows;
}

export async function removeCow(cow: CowModel) {
	const { id } = cow.modelView;
	return (await neon()`DELETE FROM "CattleTable" WHERE id = ${id}`).rows;
}

export async function editCow(cow: CowModel) {
	const { id, name, tag, dob, location, type } = cow.modelView;
	return (
		await neon()`
		UPDATE "CattleTable" 
		SET name = ${name}, tag = ${tag}, dob = ${dob}, location_id = ${location.id}, type = ${type}
		WHERE id = ${id}`
	).rows;
}
