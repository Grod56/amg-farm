"use server";

import neon from "@/lib/third-party/clients/neon";
import { CowRecord } from "@/lib/types/cow-record";
import { Location } from "@/lib/types/miscellaneous";
import { CowModel, CowModelView, CowType } from "@/lib/types/models/cow";

export async function retrieveCattle() {
	const records = await neon()`SELECT * FROM "ActiveCow"`;
	return records.rows.map(record => ({
		...record,
		tag: record.tag == null ? "" : record.tag,
	})) as CowRecord[];
}

export async function retrieveAllLocations() {
	const records = await neon()`SELECT * FROM "Location"`;
	return records.rows as Location[];
}

export async function retrieveAllCowTypes() {
	const records = await neon()`SELECT type FROM "CowType"`;
	return records.rows as { type: CowType }[];
}

export async function addCow({
	name,
	type,
	tag,
	dob,
	location,
}: Omit<CowModelView, "id">) {
	const processedTag = tag == "" ? null : tag;
	return (
		await neon()`
		INSERT INTO "CowTable"(name, type, tag, dob, location_id) 
		VALUES (${name}, ${type}, ${processedTag}, ${dob}, ${location.id})`
	).rows;
}

export async function removeCow(cow: CowModel) {
	const { id } = cow.modelView;
	return (await neon()`INSERT INTO "RemovedCow"(id) VALUES (${id})`).rows;
}

export async function editCow(cow: CowModel) {
	const { id, name, tag, dob, location, type } = cow.modelView;
	return (
		await neon()`
		UPDATE "CowTable" 
		SET name = ${name}, tag = ${tag}, dob = ${dob}, location_id = ${location.id}, type = ${type}
		WHERE id = ${id}`
	).rows;
}
