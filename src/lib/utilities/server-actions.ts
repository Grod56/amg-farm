"use server";

import PDFDocument from "pdfkit";
import { CowRecord } from "../content/cattle/cattle-api";
import { retrieveRecords } from "../implementations/repositories/server-actions";
import { IBlobStream } from "blob-stream";

export async function generateRegister(destinationStream: IBlobStream) {
	const timeGenerated = new Date(Date.now());
	const doc = new PDFDocument({
		info: {
			Title: `A & M Farm Register — ${timeGenerated.toLocaleString(
				"en-UK",
				{
					dateStyle: "long",
					timeStyle: "short",
				},
			)}`,
		},
		layout: "landscape",
		font: "Helvetica",
		size: "A4",
		margins: {
			top: "1in",
			right: ".75in",
			bottom: "1in",
			left: ".75in",
		},
		bufferPages: true,
	});
	// TODO: cowRecords only has to be declared after this for some reason
	doc.pipe(destinationStream);
	doc.fontSize(14);
	doc.font("Helvetica-Bold").text("A & M CATTLE RANCHING FARM REGISTER");
	doc.fontSize(11);
	doc.moveDown();
	doc.font("Helvetica").text("Stock Register No.: 003978");
	doc.text(
		`Generated on: ${timeGenerated.toLocaleString("en-UK", {
			dateStyle: "full",
			timeStyle: "short",
			hour12: true,
		})}`,
	);
	addHorizontalRule(doc, -1, 1);
	const cowRecords = await retrieveRecords();
	const totals: Map<string, number> = new Map();
	totals.set("All", cowRecords.length);
	new Set(cowRecords.map(record => record.type.trim()).sort()).forEach(type =>
		totals.set(
			type,
			cowRecords.filter(value => value.type.trim() == type).length,
		),
	);
	doc.markContent("span");
	doc.font("Helvetica-Bold")
		.text("Totals: ", { continued: true })
		.font("Helvetica")
		.text(
			`${[...totals.entries().map(([type, total]) => `${type} (${total})`)].join("; ")}`,
		);
	doc.endMarkedContent();
	addHorizontalRule(doc, -1, 1);
	doc.moveDown();
	writeTables(doc, cowRecords);
	addPageNumbers(doc);
	doc.end();
}

function writeTables(doc: PDFKit.PDFDocument, cowRecords: CowRecord[]) {
	let number: number = 1;
	const groupedCattle: Map<string, CowRecord[]> = new Map();
	const groups = new Set<string>(
		cowRecords.map(cowRecord => cowRecord.location),
	);
	groups.forEach(group => {
		const cattle: CowRecord[] = cowRecords.filter(
			cowRecord => cowRecord.location == group,
		);
		groupedCattle.set(group, cattle);
	});

	groupedCattle.entries().forEach(([, cowRecords], index) => {
		doc.fontSize(12);
		doc.font("Helvetica-Bold").text(`From ${cowRecords[0].location}`, {
			underline: true,
		});
		doc.fontSize(9.5);
		doc.font("Helvetica");
		doc.moveDown();
		const defaultStyle = { borderColor: "grey", border: 0.5 };
		const columnStyles = ["*", "*", 100, "*", 100, "*"];
		const rows = cowRecords.map(cowRecord => [
			{
				text: String(number++),
				font: { src: "Helvetica-Bold" },
				align: "center" as const,
			},
			{ text: cowRecord.type, align: "center" as const },
			{ text: cowRecord.name, align: "center" as const },
			{ text: cowRecord.tag, align: "center" as const },
			{
				text: new Date(cowRecord.dob).toLocaleDateString("en-UK", {
					year: "numeric",
					month: "short",
					day: "2-digit",
				}),
				align: "center" as const,
			},
			"",
			"",
			"",
			"",
			"",
			"",
			"",
			"",
		]);
		if (index == 0) {
			doc.table({
				defaultStyle,
				columnStyles,
				data: [
					[
						{
							font: { src: "Helvetica-Bold" },
							rowSpan: 2,
							text: "No.",
							align: "center",
						},
						{
							font: { src: "Helvetica-Bold" },
							rowSpan: 2,
							text: "Type",
							align: "center",
						},
						{
							font: { src: "Helvetica-Bold" },
							rowSpan: 2,
							text: "Cattle Name",
							align: "center",
						},
						{
							font: { src: "Helvetica-Bold" },
							rowSpan: 2,
							text: "Tag Number",
							align: "center",
						},
						{
							font: { src: "Helvetica-Bold" },
							rowSpan: 2,
							text: "DOB",
							align: "center",
						},
						{
							font: { src: "Helvetica-Bold" },
							colSpan: 8,
							text: "Date Marked",
							align: "center",
						},
					],
					["", "", "", "", "", "", "", ""],
					...rows,
				],
			});
		} else {
			doc.table({ defaultStyle, columnStyles, data: [...rows] });
		}
		doc.moveDown(2);
	});
}

function addHorizontalRule(
	doc: PDFKit.PDFDocument,
	spaceFromEdge = -1,
	linesAboveAndBelow = 0.5,
) {
	let leftSpaceFromEdge = spaceFromEdge;
	let rightSpaceFromEdge = spaceFromEdge;

	if (spaceFromEdge == -1) {
		leftSpaceFromEdge = doc.page.margins.left;
		rightSpaceFromEdge = doc.page.margins.right;
	}

	doc.moveDown(linesAboveAndBelow);

	doc.moveTo(0 + leftSpaceFromEdge, doc.y)
		.lineTo(doc.page.width - rightSpaceFromEdge, doc.y)
		.stroke("grey");

	doc.moveDown(linesAboveAndBelow);

	return doc;
}

function addPageNumbers(doc: PDFKit.PDFDocument) {
	const pages = doc.bufferedPageRange();
	for (let i = 0; i < pages.count; i++) {
		doc.switchToPage(i);

		const oldBottomMargin = doc.page.margins.bottom;
		doc.page.margins.bottom = 0;
		doc.text(`${i + 1}`, 0, doc.page.height - oldBottomMargin / 2, {
			align: "right",
		});
		doc.page.margins.bottom = oldBottomMargin; // ReProtect bottom margin
	}
	doc.flushPages();
}
