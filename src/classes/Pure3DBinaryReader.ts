//
// Imports
//

import { BinaryReader } from "@donutteam/binary-rw";

import { Colour } from "./Colour.js";

//
// Class
//

export class Pure3DBinaryReader extends BinaryReader
{
	readPure3DColour() : Colour
	{
		const colorBytes = this.readBytes(4);

		if (!this.isLittleEndian)
		{
			colorBytes.reverse();
		}

		const blue = colorBytes[0]!;

		const green = colorBytes[1]!;

		const red = colorBytes[2]!;

		const alpha = colorBytes[3]!;

		return new Colour({ blue, green, red, alpha });
	}

	readPure3DFourCharacterCode() : string
	{
		let rawString = this.readString(4);

		if (!this.isLittleEndian)
		{
			rawString = rawString.split("").toReversed().join("");
		}

		return this.trimNull(rawString);
	}

	readPure3DString() : string
	{
		const length = this.readUInt8();

		const rawString = this.readString(length);

		return this.trimNull(rawString);
	}

	trimNull(inputString : string) : string
	{
		const nullIndex = inputString.indexOf("\0");

		if (nullIndex == -1)
		{
			return inputString;
		}

		return inputString.substring(0, nullIndex);
	}
}