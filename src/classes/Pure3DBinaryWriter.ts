//
// Imports
//

import { BinaryWriter } from "@donutteam/binary-rw";

import { Colour } from "./Colour.js";

//
// Class
//

export class Pure3DBinaryWriter extends BinaryWriter
{
	writePure3DColour(colour : Colour) : void
	{
		if (this.isLittleEndian)
		{
			this.writeUInt8(colour.blue);

			this.writeUInt8(colour.green);

			this.writeUInt8(colour.red);

			this.writeUInt8(colour.alpha);
		}
		else
		{
			this.writeUInt8(colour.alpha);

			this.writeUInt8(colour.red);

			this.writeUInt8(colour.green);

			this.writeUInt8(colour.blue);
		}
	}

	writePure3DFourCharacterCode(value : string) : void
	{
		if (value.length > 4)
		{
			throw new Error("Four character code must be less than or equal to 4 characters.");
		}

		let paddedValue = value.padEnd(4, "\0");

		if (!this.isLittleEndian)
		{
			paddedValue = paddedValue.split("").toReversed().join("");
		}

		this.writeString(paddedValue);
	}

	writePure3DString(value : string) : void
	{
		if (value.length > 255)
		{
			throw new Error("String length must be less than or equal to 255.");
		}

		let valueToWrite = value;

		if (valueToWrite.length < 252)
		{
			// Note: This padding is intentionally fucked (doesn't include the length byte)
			//	because Radical was stupid when they were making The Simpsons Hit & Run
			valueToWrite = value.padEnd(4 * Math.ceil(value.length / 4), "\0");
		}

		this.writeUInt8(valueToWrite.length);

		this.writeString(valueToWrite);
	}
}