"use server";

import neon from "@/lib/third-party/clients/neon";
import { CowRecord } from "@/lib/types/cow-record";
import { Location } from "@/lib/types/miscellaneous";
import { CattleRepositoryModelView } from "@/lib/types/models/cattle-repository";
import { CowModel, CowModelView, CowType } from "@/lib/types/models/cow";
import { newReadonlyModel } from "@mvc-react/mvc";

export async function getCattleRepositorySnapshot() {
	const records = await retrieveCowRecords();
	const allLocations = await retrieveAllLocations();
	const cowTypes = await retrieveAllCowTypes();

	return {
		cattle: records.map(record =>
			newReadonlyModel<CowModelView>({
				id: record.id,
				name: record.name,
				type: record.type,
				tag: record.tag,
				dob: new Date(record.dob),
				location: {
					id: record.location_id,
					name: record.location_name,
				},
			}),
		),
		activeLocations: [
			...new Set(
				records.map(record => ({
					id: record.location_id,
					name: record.location_name,
				})),
			),
		],
		allLocations,
		cowTypes,
	} as CattleRepositoryModelView;
}

export async function retrieveCowRecords() {
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

export async function removeCow(
	cow: CowModel,
	reason?: number,
	comments?: string,
) {
	const { id } = cow.modelView;
	return (
		await neon()`
		INSERT INTO "RemovedCow"(id, reason, comments) 
		VALUES (${id}, ${reason}, ${comments})`
	).rows;
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
