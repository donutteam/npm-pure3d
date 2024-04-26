//
// Imports
//

import fs from "node:fs";
import path from "node:path";

import { DE } from "@donutteam/document-builder";
import cliProgress from "cli-progress";

import * as Pure3D from "../index.js";

import { scanDirectory } from "../libs/util.js";

//
//
//

interface Pure3DGame
{
	title : string;

	platform : "PC" | "Xbox";

	directoryPath : string;
}

const pure3dGames : Pure3DGame[] =
	[
		{
			title: "Prototype 2",
			platform: "PC",
			directoryPath: "F:\\Pure3D Games\\Prototype 2 [PC]",
		},
		{
			title: "The Simpsons Hit & Run",
			platform: "PC",
			directoryPath: "F:\\Pure3D Games\\The Simpsons Hit & Run [PC]",
		},
		{
			title: "The Simpsons Road Rage",
			platform: "Xbox",
			directoryPath: "F:\\Pure3D Games\\The Simpsons Road Rage [Xbox]",
		},
	];

interface EncounteredChunk
{
	identifier : number;

	games : Set<Pure3DGame>;

	filePaths : Set<string>;
}

const encounteredChunkMap = new Map<number, EncounteredChunk>();

await main();

//
// Functions
//

async function main() : Promise<void>
{
	for (const pure3dGame of pure3dGames)
	{
		console.log("Scanning directory for P3D files: " + pure3dGame.directoryPath);

		try
		{
			const { pure3dFilePaths } = await scanDirectory(
				{
					directoryPath: pure3dGame.directoryPath,
					depth: 0,
				});

			// rewrite progress bar with custom template, show current file
			const progressBar = new cliProgress.SingleBar(
				{
					format: "{bar} {percentage}% | {value}/{total} | {file}",
				});

			progressBar.start(pure3dFilePaths.length, 0);

			for (const pure3dFilePath of pure3dFilePaths)
			{
				progressBar.increment(undefined,
					{
						file: pure3dFilePath,
					});

				await processFile(pure3dGame, pure3dFilePath);
			}

			progressBar.stop();
		}
		catch (error)
		{
			console.error("Failed to scan directory: " + pure3dGame.directoryPath, error);
		}
	}

	const encounteredChunks = Array.from(encounteredChunkMap.values())
		.sort(
			(a, b) =>
			{
				// sort by number of games desc
				// then identifier asc

				const gameCountDifference = b.games.size - a.games.size;

				if (gameCountDifference !== 0)
				{
					return gameCountDifference;
				}

				return a.identifier - b.identifier;
			});

	await writeHtmlReport(encounteredChunks);

	await writeJsonReport(encounteredChunks);
}

async function processFile(pure3dGame : Pure3DGame, pure3dFilePath : string) : Promise<void>
{
	try
	{
		const nodeBuffer = await fs.promises.readFile(pure3dFilePath);

		const rootChunk = Pure3D.File.fromArrayBuffer(
			{
				arrayBuffer: nodeBuffer.buffer,
			});

		for (const chunk of rootChunk.children)
		{
			processChunk(pure3dGame, pure3dFilePath, chunk);
		}
	}
	catch (error)
	{
		console.error("Failed to load P3D file: " + pure3dFilePath, error);
	}
}

function processChunk(pure3dGame : Pure3DGame, pure3dFilePath : string, chunk : Pure3D.Chunk) : void
{
	const encounteredChunk = encounteredChunkMap.get(chunk.identifier) ??
		{
			identifier: chunk.identifier,
			games: new Set<Pure3DGame>(),
			filePaths: new Set<string>(),
		} satisfies EncounteredChunk;

	encounteredChunk.games.add(pure3dGame);

	encounteredChunk.filePaths.add(pure3dFilePath);

	encounteredChunkMap.set(chunk.identifier, encounteredChunk);

	for (const child of chunk.children)
	{
		processChunk(pure3dGame, pure3dFilePath, child);
	}
}

async function writeHtmlReport(encounteredChunks : EncounteredChunk[]) : Promise<void>
{
	const tableRowElements = encounteredChunks.map(
		(encounteredChunk) =>
		{
			return new DE("tr", null,
				[
					new DE("td", null,
						[
							new DE("code", null, encounteredChunk.identifier.toString(16)),
						]),

					new DE("td", null,
						[
							new DE("ul", null,
								[
									Array.from(encounteredChunk.games.values()).map(
										game =>
										{
											return new DE("li", null, game.title + " (" + game.platform + ")");
										}),
								]),
						]),

					new DE("td", null,
						[
							new DE("details", null,
								[
									new DE("summary", null, "File paths"),

									new DE("ul", null,
										[
											Array.from(encounteredChunk.filePaths.values()).map(
												(filePath) =>
												{
													return new DE("li", null, filePath);
												}),
										]),
								]),


						]),
				]);
		});

	const tableElement = new DE("table", null, tableRowElements);

	const htmlElement = new DE("html", null,
		[
			new DE("head", null,
				[
					new DE("style", null, "table { border-collapse: collapse; } td { border: 1px solid black; padding: 0.5em; }"),
				]),

			new DE("body", null,
				[
					tableElement,
				]),
		]);

	const html = htmlElement.renderToString();

	await fs.promises.writeFile(path.join("D:", "Desktop", "encountered-chunks.html"), html,
		{
			encoding: "utf-8",
		});
}

async function writeJsonReport(encounteredChunks : EncounteredChunk[]) : Promise<void>
{
	const encounteredChunks2 = encounteredChunks
		.map(encounteredChunk =>
		{
			return {
				identifier: encounteredChunk.identifier,
				games: Array.from(encounteredChunk.games.values()).map(game => game.title + " (" + game.platform + ")"),
				filePaths: Array.from(encounteredChunk.filePaths.values()),
			};
		});

	const json = JSON.stringify(encounteredChunks2, null, "\t");

	await fs.promises.writeFile(path.join("D:", "Desktop", "encountered-chunks.json"), json,
		{
			encoding: "utf-8",
		});
}