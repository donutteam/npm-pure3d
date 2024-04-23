//
// Imports
//

import { BinaryReader } from "@donutteam/binary-rw";

//
// Class
//

export class Pure3DBinaryReader extends BinaryReader
{
	readFourCharacterCode() : string
	{
		let rawString = this.readString(4);

		if (!this.isLittleEndian)
		{
			rawString = rawString.split("").reverse().join("");
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