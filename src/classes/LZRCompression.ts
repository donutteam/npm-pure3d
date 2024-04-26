//
// Imports
//

import { BinaryReader } from "@donutteam/binary-rw";
import { File } from "./File.js";

//
// Class
//

export class LZRCompression
{
	static decompressFile(file : BinaryReader) : ArrayBuffer
	{
		const identifier = file.readUInt32();

		if (identifier != File.signatures.COMPRESSED)
		{
			file.seek(0);

			return BinaryReader.typedArrayToBuffer(file.readBytes(file.getLength()));
		}

		const length = file.readUInt32();

		const decompressed = this.#decompress(file, length);

		return BinaryReader.typedArrayToBuffer(new Uint8Array([ ...decompressed ]));
	}

	static #decompress(file : BinaryReader, uncompressedLength : number) : Uint8Array
	{
		let decompressedLength = 0;

		let output = new Uint8Array(uncompressedLength);

		let compressedLength : number;

		let uncompressedBlock : number;

		let startPos : number;

		while (decompressedLength < uncompressedLength)
		{
			compressedLength = file.readUInt32();

			uncompressedBlock = file.readUInt32();

			startPos = file.getPosition();

			output.set(this.#decompressBlock(file, uncompressedBlock), decompressedLength);

			decompressedLength += uncompressedBlock;

			file.seek(startPos + compressedLength);
		}

		return output;
	}

	static #decompressBlock(br : BinaryReader, size : number) : Uint8Array
	{
		const output = new Uint8Array(size);

		let written = 0;

		while (written < size)
		{
			let code = br.readUInt8();

			if (code > 15)
			{
				let matchLength = code & 15;

				let tmp : number;

				if (matchLength == 0)
				{
					matchLength = 15;

					tmp = br.readUInt8();

					while (tmp == 0)
					{
						matchLength += 255;

						tmp = br.readUInt8();
					}

					matchLength += tmp;
				}

				tmp = br.readUInt8();

				const offset = (code >> 4) | tmp << 4;

				let matchPos = written - offset;

				let len = matchLength >> 2;

				matchLength -= len << 2;

				do
				{
					output[written] = output[matchPos]!;
					written += 1;
					matchPos += 1;

					output[written] = output[matchPos]!;
					written += 1;
					matchPos += 1;

					output[written] = output[matchPos]!;
					written += 1;
					matchPos += 1;

					output[written] = output[matchPos]!;
					written += 1;
					matchPos += 1;

					len -= 1;
				} while (len != 0);

				while (matchLength != 0)
				{
					output[written] = output[matchPos]!;
					written += 1;
					matchPos += 1;

					matchLength -= 1;
				}
			}
			else
			{
				let runLength = code;

				if (runLength == 0)
				{
					code = br.readUInt8();

					while (code == 0)
					{
						runLength += 255;

						code = br.readUInt8();
					}

					runLength += code;

					output.set(br.readBytes(runLength), written);
					
					written += runLength;
				}
			}
		}

		return output;
	}
}