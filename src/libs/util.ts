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

	depth? : number;
}

export interface ScanDirectoryResult
{
	pure3dFilePaths : string[];
}

export async function scanDirectory(options : ScanDirectoryOptions) : Promise<ScanDirectoryResult>
{
	const depth = options.depth ?? 0;

	const entries = await fs.promises.readdir(options.directoryPath,
		{
			withFileTypes: true,
		});

	const pure3dFilePaths : string[] = [];

	for (const entry of entries)
	{
		if (entry.isDirectory())
		{
			const scanPath = path.join(options.directoryPath, entry.name);

			const { pure3dFilePaths: directoryPure3dFilePaths } = await scanDirectory(
				{
					directoryPath: scanPath,
					depth: depth + 1,
				});

			pure3dFilePaths.push(...directoryPure3dFilePaths);

			continue;
		}

		const filePath = path.join(options.directoryPath, entry.name);

		if (!filePath.endsWith(".p3d"))
		{
			continue;
		}

		pure3dFilePaths.push(filePath);
	}

	return {
		pure3dFilePaths,
	};
}