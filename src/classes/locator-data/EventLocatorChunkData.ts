//
// Imports
//

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";

import { LocatorChunkData } from "./LocatorChunkData.js";

//
// Class
//

export interface EventLocatorChunkDataOptions
{
	event: number;

	parameter: number | null;
}

export class EventLocatorChunkData extends LocatorChunkData implements EventLocatorChunkDataOptions
{
	static override read(dataLength: number, binaryReader: Pure3DBinaryReader): EventLocatorChunkData
	{
		const event = binaryReader.readUInt32();

		let parameter : number | null = null;

		if (dataLength == 2)
		{
			parameter = binaryReader.readUInt32();
		}

		return new EventLocatorChunkData(
			{
				event, 
				parameter,
			});
	}

	event: number;

	parameter: number | null;

	constructor(options: EventLocatorChunkDataOptions)
	{
		super();

		this.event = options.event;

		this.parameter = options.parameter;
	}

	override write(binaryWriter: Pure3DBinaryWriter): number
	{
		const dataLength = this.parameter != null ? 2 : 1;

		binaryWriter.writeUInt16(dataLength);

		binaryWriter.writeUInt32(this.event);

		if (this.parameter != null)
		{
			binaryWriter.writeUInt32(this.parameter);
		}

		return dataLength;
	}
}