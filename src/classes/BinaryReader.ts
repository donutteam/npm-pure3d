//
// Class
//

export interface BinaryReaderOptions
{
	arrayBuffer : ArrayBuffer;

	isLittleEndian : boolean;

	offset? : number;
}

export class BinaryReader
{
	isLittleEndian : boolean;

	position : number;

	view : DataView;

	constructor(options : BinaryReaderOptions)
	{
		this.isLittleEndian = options.isLittleEndian;

		this.position = 0;

		this.view = new DataView(options.arrayBuffer, options.offset ?? 0);
	}

	readFloat32() : number
	{
		const float = this.view.getFloat32(this.position, this.isLittleEndian);

		this.position += 4;

		return float;
	}

	readFloat64() : number
	{
		const float = this.view.getFloat64(this.position, this.isLittleEndian);

		this.position += 8;

		return float;
	}

	readInt8() : number
	{
		const int = this.view.getInt8(this.position);

		this.position += 1;

		return int;
	}

	readInt16() : number
	{
		const int = this.view.getInt16(this.position, this.isLittleEndian);

		this.position += 2;

		return int;
	}

	readInt32() : number
	{
		const int = this.view.getInt32(this.position, this.isLittleEndian);

		this.position += 4;

		return int;
	}

	readInt64() : BigInt
	{
		const bigInt = this.view.getBigInt64(this.position, this.isLittleEndian);

		this.position += 8;

		return bigInt;
	}

	readLengthPrefixedString()
	{
		let startPosition = this.position;

		const length = this.readUInt8();

		let buffer = [];

		for (let i = 0; i < length; i++)
		{
			const character = this.readUInt8();

			if (character == 0)
			{
				break;
			}

			buffer.push(character);
		}

		this.position = startPosition + 1 + length;

		return String.fromCharCode.apply(String, buffer);
	}

	readUInt8() : number
	{
		const int = this.view.getUint8(this.position);

		this.position += 1;

		return int;
	}

	readUInt16() : number
	{
		const int = this.view.getUint16(this.position, this.isLittleEndian);

		this.position += 2;

		return int;
	}

	readUInt32() : number
	{
		const int = this.view.getUint32(this.position, this.isLittleEndian);

		this.position += 4;

		return int;
	}

	readUInt64() : BigInt
	{
		const bigInt = this.view.getBigUint64(this.position, this.isLittleEndian);

		this.position += 8;

		return bigInt;
	}
}