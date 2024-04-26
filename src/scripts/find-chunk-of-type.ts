//
// Imports
//

import fs from "node:fs";

import commandLineArgs from "command-line-args";

import * as Pure3D from "../index.js";

import { scanDirectory } from "../libs/util.js";

//
// Script
//

const { directoryPaths, identifiers, verbose, onlyFirst } = getCommandLineArguments();

const p3dFilePaths : string[] = [];

for (const directoryPath of directoryPaths)
{
	if (!fs.existsSync(directoryPath))
	{
		continue;
	}

	const { p3dFilePaths: directoryP3DFilePaths } = await scanDirectory(
		{
			directoryPath,
			identifiers,
			depth: 0,
		});

	p3dFilePaths.push(...directoryP3DFilePaths);
}

const relevantP3DFilePaths : string[] = [];

for (const p3dFilePath of p3dFilePaths)
{
	if (verbose)
	{
		console.log("Scanning " + p3dFilePath + "...");
	}

	const { hasRelevantChunk } = await scanFile(
		{
			filePath: p3dFilePath,
			identifiers,
			depth: 0,
		});

	if (hasRelevantChunk)
	{
		relevantP3DFilePaths.push(p3dFilePath);

		if (onlyFirst)
		{
			break;
		}
	}
}

console.log("Found " + relevantP3DFilePaths.length + " files with relevant chunks.");

for (const relevantP3DFilePath of relevantP3DFilePaths)
{
	console.log("\t" + relevantP3DFilePath);
}

//
// Functions
//

export interface GetCommandLineArgumentsResult
{
	directoryPaths : string[];

	identifiers : number[];

	verbose : boolean;

	onlyFirst : boolean;
}

function getCommandLineArguments() : GetCommandLineArgumentsResult
{
	const commandLineArguments = commandLineArgs(
		[
			{
				name: "dir",
				type: String,
				alias: "s",
				defaultValue:
					[
						"C:\\Program Files (x86)\\Vivendi Universal Games\\The Simpsons Hit & Run\\art",

						// Loren: This is my personal installation.
						"E:\\Other\\The Simpsons Hit & Run\\Installs\\The Simpsons Hit & Run\\art",
					],
				multiple: true,
			},
			{
				name: "identifier",
				type: Number,
				alias: "i",
				multiple: true,
				defaultValue:
					[
						Pure3D.Chunk.identifiers.TEXTURE,
					],
			},
			{
				name: "verbose",
				type: Boolean,
				alias: "v",
			},
			{
				name: "only-first",
				type: Boolean,
				alias: "f",
			},
		]) as { dir : string[], identifier : number[], verbose : boolean, "only-first" : boolean };

	return {
		directoryPaths: commandLineArguments.dir,
		identifiers: commandLineArguments.identifier,
		verbose: commandLineArguments.verbose,
		onlyFirst: commandLineArguments["only-first"],
	};
}

export interface ScanFileOptions
{
	filePath : string;

	identifiers : number[];

	depth : number;
}

export interface ScanFileResult
{
	hasRelevantChunk : boolean;
}

async function scanFile(options : ScanFileOptions) : Promise<ScanFileResult>
{
	const fileBuffer = await fs.promises.readFile(options.filePath);

	try
	{
		const rootChunk = Pure3D.File.fromArrayBuffer(
			{
				arrayBuffer: fileBuffer,
			});

		for (const child of rootChunk.children)
		{
			if (identifiers.includes(child.identifier))
			{
				return {
					hasRelevantChunk: true,
				};
			}
		}
	}
	catch (error)
	{
		console.error("Error scanning file:", options.filePath, error);
	}

	return {
		hasRelevantChunk: false,
	};
}