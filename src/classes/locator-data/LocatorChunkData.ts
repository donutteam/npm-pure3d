//
// Imports
//

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

//
// Class
//

export class LocatorChunkData
{
	static read(_dataLength: number, _binaryReader: Pure3DBinaryReader): LocatorChunkData
	{
		return new LocatorChunkData();
	}

	write(_binaryWriter: Pure3DBinaryWriter): number
	{
		return 0;
	}
}