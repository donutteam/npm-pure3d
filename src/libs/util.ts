//
// Imports
//

import fs from "node:fs";
import path from "node:path";

//
// Functions
//

export interface ScanDirectoryOptions
{
	directoryPath : string;

	identifiers : number[];

	depth : number;
}

export interface ScanDirectoryResult
{
	p3dFilePaths : string[];
}

export async function scanDirectory(options : ScanDirectoryOptions) : Promise<ScanDirectoryResult>
{
	const entries = await fs.promises.readdir(options.directoryPath,
		{
			withFileTypes: true,
		});

	const p3dFilePaths : string[] = [];

	for (const entry of entries)
	{
		if (entry.isDirectory())
		{
			const scanPath = path.join(options.directoryPath, entry.name);

			const { p3dFilePaths: directoryp3dFilePaths } = await scanDirectory(
				{
					directoryPath: scanPath,
					identifiers: options.identifiers,
					depth: options.depth + 1,
				});

			p3dFilePaths.push(...directoryp3dFilePaths);

			continue;
		}

		const filePath = path.join(options.directoryPath, entry.name);

		if (!filePath.endsWith(".p3d"))
		{
			continue;
		}

		p3dFilePaths.push(filePath);
	}

	return {
		p3dFilePaths,
	};
}