//
// Imports
//

import { Chunk, ChunkOptions, ChunkParseDataOptions } from "./Chunk.js";

import { Pure3DBinaryReader } from "../Pure3DBinaryReader.js";
import { Pure3DBinaryWriter } from "../Pure3DBinaryWriter.js";
import { Vector3 } from "../Vector3.js";

import { EventLocatorChunkData } from "../locator-data/EventLocatorChunkData.js";
import { GenericLocatorChunkData } from "../locator-data/GenericLocatorChunkData.js";
import { LocatorChunkData } from "../locator-data/LocatorChunkData.js";

//
// Class
//

export interface LocatorChunkOptions
{
	name: string;

	data: LocatorChunkData;

	position: Vector3;
}

export class LocatorChunk extends Chunk implements LocatorChunkOptions
{
	static types =
	{
		Event: 0,
		Script: 1,
		Generic: 2,
		CarStart: 3,
		Spline: 4,
		DynamicZone: 5,
		Occlusion: 6,
		InteriorEntrance: 7,
		Directional: 8,
		Action: 9,
		FOV: 10,
		BreakableCamera: 11,
		StaticCamera: 12,
		PedGroup: 13,
		Coin: 14,
	};

	static override parseData(options: ChunkParseDataOptions): LocatorChunkOptions
	{
		const binaryReader = new Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const name = binaryReader.readPure3DString();

		const type = binaryReader.readUInt32();

		const dataLength = binaryReader.readUInt32();

		let data: LocatorChunkData;

		switch (type)
		{
			case LocatorChunk.types.Event: // Event
			{
				data = EventLocatorChunkData.read(dataLength, binaryReader);

				break;
			}

			case LocatorChunk.types.Script:
			{
				throw new Error("Not implemented.");
			}

			case LocatorChunk.types.Generic:
			{
				data = GenericLocatorChunkData.read(dataLength, binaryReader);

				break;
			}

			default:
			{
				throw new Error("Unexpected locator type: " + type);
			}
		}

		const position = binaryReader.readPure3DVector3();

		return {
			name,
			data,
			position,
		};
	}

	name: string;

	data: LocatorChunkData;

	position: Vector3;

	constructor(options : Omit<ChunkOptions, "identifier"> & LocatorChunkOptions)
	{
		super(
			{
				...options,

				identifier: Chunk.identifiers.SHADER,
			});

		this.name = options.name;

		this.data = options.data;

		this.position = options.position;
	}

	getNumberOfTriggers(): number
	{
		let triggerCount = 0;

		for (const child of this.children)
		{
			if (child.identifier == Chunk.identifiers.TRIGGER_VOLUME)
			{
				triggerCount += 1;
			}
		}

		return triggerCount;
	}

	getType(): number
	{
		if (this.data instanceof EventLocatorChunkData)
		{
			return LocatorChunk.types.Event;
		}
		else if (this.data instanceof GenericLocatorChunkData)
		{
			return LocatorChunk.types.Generic;
		}
		else
		{
			throw new Error("Unexpected locator data type.");
		}
	}

	override writeData(binaryWriter : Pure3DBinaryWriter): void
	{
		binaryWriter.writePure3DString(this.name);

		binaryWriter.writeUInt32(this.getType());

		const dataLength = this.data.write(binaryWriter);

		binaryWriter.writeUInt32(dataLength);

		binaryWriter.writePure3DVector3(this.position);

		binaryWriter.writeUInt32(this.getNumberOfTriggers());
	}
}