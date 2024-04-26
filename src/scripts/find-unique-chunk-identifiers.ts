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
// Classes
//

interface EncounteredChunkOptions
{
	identifier : number;
}

class EncounteredChunk implements EncounteredChunkOptions
{
	identifier : number;

	games : Set<Game>;

	filePaths : Set<string>;

	constructor(options : EncounteredChunkOptions)
	{
		this.identifier = options.identifier;

		this.games = new Set<Game>;

		this.filePaths = new Set<string>;
	}
}

interface GameOptions
{
	title : string;

	platform : GamePlatform;

	directoryPath : string;
}

type GamePlatform = "GameCube" | "PC" | "Xbox";

class Game implements GameOptions
{
	title : string;

	platform : GamePlatform;

	directoryPath : string;

	constructor(options : GameOptions)
	{
		this.title = options.title;

		this.platform = options.platform;

		this.directoryPath = options.directoryPath;
	}
}

class EncounteredChunksReport
{
	readonly #encounteredChunksMap : Map<number, EncounteredChunk>;

	readonly #failedFiles : string[];

	constructor()
	{
		this.#encounteredChunksMap = new Map<number, EncounteredChunk>();

		this.#failedFiles = [];
	}

	addFailedFile(filePath : string) : void
	{
		this.#failedFiles.push(filePath);
	}

	getFailedFiles() : string[]
	{
		return [ ...this.#failedFiles ];
	}

	logEncounteredChunk(game : Game, identifier : number, filePath : string) : void
	{
		const encounteredChunk = this.#encounteredChunksMap.get(identifier) ??
			{
				identifier: identifier,
				games: new Set<Game>(),
				filePaths: new Set<string>(),
			} satisfies EncounteredChunk;

		encounteredChunk.games.add(game);

		encounteredChunk.filePaths.add(filePath);

		this.#encounteredChunksMap.set(identifier, encounteredChunk);
	}

	getEncounteredChunks()
	{
		return Array.from(this.#encounteredChunksMap.values())
			.sort((a, b) =>
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
	}

	toJSON()
	{
		return {
			failedFiles: this.getFailedFiles(),

			encounteredChunks: this.getEncounteredChunks()
				.map(encounteredChunk =>
				{
					return {
						identifier: encounteredChunk.identifier,
						games: Array.from(encounteredChunk.games.values()).map(game => game.title + " (" + game.platform + ")"),
						filePaths: Array.from(encounteredChunk.filePaths.values()),
					};
				}),
		};
	}
}

//
// Functions
//

async function scanGames(games : Game[]) : Promise<EncounteredChunksReport>
{
	const encounteredChunksReport = new EncounteredChunksReport();

	for (const game of games)
	{
		console.log("Scanning game directory for P3D files: " + game.directoryPath);

		try
		{
			const { pure3dFilePaths } = await scanDirectory(
				{
					directoryPath: game.directoryPath,
					depth: 0,
				});

			let progressBar = new cliProgress.SingleBar(
				{
					format: "{bar} {percentage}% | {value}/{total} | {file}",
				});

			progressBar.start(pure3dFilePaths.length, 0);

			for (const pure3dFilePath of pure3dFilePaths)
			{
				progressBar!.increment(undefined,
					{
						file: pure3dFilePath,
					});

				await processFile(encounteredChunksReport, game, pure3dFilePath);
			}

			progressBar!.stop();
		}
		catch (error)
		{
			console.error("Failed to scan directory: " + game.directoryPath, error);
		}
	}

	return encounteredChunksReport;
}

async function processFile(encounteredChunksReport : EncounteredChunksReport, game : Game, pure3dFilePath : string) : Promise<void>
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
			processChunk(encounteredChunksReport, game, pure3dFilePath, chunk);
		}
	}
	catch (error)
	{
		encounteredChunksReport.addFailedFile(pure3dFilePath);
	}
}

function processChunk(encounteredChunksReport : EncounteredChunksReport, game : Game, pure3dFilePath : string, chunk : Pure3D.Chunk) : void
{
	encounteredChunksReport.logEncounteredChunk(game, chunk.identifier, pure3dFilePath);

	for (const child of chunk.children)
	{
		processChunk(encounteredChunksReport, game, pure3dFilePath, child);
	}
}

async function writeHtmlReport(encounteredChunksReport : EncounteredChunksReport) : Promise<void>
{
	const encounteredChunks = encounteredChunksReport.getEncounteredChunks();

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

async function writeJsonReport(encounteredChunksReport : EncounteredChunksReport) : Promise<void>
{
	const json = JSON.stringify(encounteredChunksReport, null, "\t");

	await fs.promises.writeFile(path.join("D:", "Desktop", "encountered-chunks.json"), json,
		{
			encoding: "utf-8",
		});
}

//
// Script
//

const games : Game[] =
	[
		new Game(
			{
				title: "Dark Summit",
				platform: "GameCube",
				directoryPath: "F:\\Pure3D Games\\Dark Summit [GameCube]",
			}),

		new Game(
			{
				title: "The Simpsons Road Rage",
				platform: "Xbox",
				directoryPath: "F:\\Pure3D Games\\The Simpsons Road Rage [Xbox]",
			}),

		// TODO: Tetris Worlds

		// TODO: Monsters, Inc. Scream Arena

		// TODO: James Cameron's Dark Angel

		// TODO: CSI: Crime Scene Investigation

		// TODO: Hulk

		new Game(
			{
				title: "The Simpsons Hit & Run",
				platform: "PC",
				directoryPath: "F:\\Pure3D Games\\The Simpsons Hit & Run [PC]",
			}),

		// TODO: CSI: Dark Motives

		// TODO: CSI: Miami

		// TODO: The Incredible Hulk: Ultimate Destruction

		// TODO: Crash Tag Team Racing

		// TODO: Scarface: The World Is Yours

		// TODO: Crash of the Titans

		// TODO: Crash Mind Over Mutant

		new Game(
			{
				title: "Prototype",
				platform: "PC",
				directoryPath: "F:\\Pure3D Games\\Prototype [PC]",
			}),

		new Game(
			{
				title: "Prototype 2",
				platform: "PC",
				directoryPath: "F:\\Pure3D Games\\Prototype 2 [PC]",
			}),
	];

const encounteredChunksReport = await scanGames(games);

await writeHtmlReport(encounteredChunksReport);

await writeJsonReport(encounteredChunksReport);