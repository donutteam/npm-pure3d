# TypeScript Pure3D Library
This is a TypeScript library designed to read and write Pure3D files from video games created by Radical Entertainment.

This library is very significantly based upon [LuaP3DLib](https://github.com/Hampo/LuaP3DLib), a similar library for Lua.

This library aims to be environment agnostic, so it should work in both Node.js and the browser. That said, it has only been tested in Node.js at this time.

## Installation
This library has only been tested with Node.js 20.8.1. It may work in earlier versions, but it is not guaranteed.

Furthermore, this package is only distributed as an ES module.

```shell
npm install @donutteam/pure3d
```

You will also need to install `@donutteam/binary-rw`:

```shell
npm install @donutteam/binary-rw
```

## Usage
Import the package like so:

```ts
import * as Pure3D from "@donutteam/pure3d";
```

### Reading a Pure3D File
Reading a file is as simple as passing an `ArrayBuffer` of Pure3D file data to `Pure3D.File.read`:
```ts
const nodeBuffer = await fs.promises.readFile("path/to/file.p3d");

// Note: ".buffer" is an ArrayBuffer instead of a Node.js Buffer.
const arrayBuffer = nodeBuffer.buffer;

const rootChunk = Pure3D.File.read(
	{
		arrayBuffer,
	});
```

### Creating a New Chunk
The library includes bespoke classes for many chunk types found within The Simpsons Hit & Run. You can use these to easily create various kinds of chunks.

Here's an example of creating a `HistoryChunk`:
```ts
const historyChunk = new Pure3D.HistoryChunk(
	{
		lines:
			[
				"This is an example!",
			]
	});
```

### Writing a Pure3D File
Once you're done modifying the chunks, you can write the file back to an `ArrayBuffer`:
```ts
const newArrayBuffer = Pure3D.File.write(
	{
		rootChunk,
	});
```

Or, alternatively, you can bypass needing a root chunk and write a file with only children. This is useful when creating a file from scratch instead of modifying an existing one:
```ts
const historyChunk = new Pure3D.HistoryChunk(
	{
		lines:
			[
				"This is an example!",
			]
	});

const newArrayBuffer = Pure3D.File.write(
	{
		children:
			[
				historyChunk,
			],
	});

await fs.promises.writeFile("path/to/output.p3d", Buffer.from(newArrayBuffer));
```

## Registering New Chunk Types
Currently, this package only has partial support for chunks found in The Simpsons Hit & Run.

Supported chunks are handled via a `ChunkRegistry` which maps chunk identifiers to classes. The library includes a `defaultChunkRegistry` instance which registers all classes included by the library.

To register new chunk types, you can write your own Chunk class:
```ts
export interface ExampleChunkOptions
{
	value1 : number;

	value2 : string;

	value3 : Pure3D.Matrix;
}

export class ExampleChunk extends Pure3D.Chunk implements ExampleChunkOptions
{
	static parseData(options : Pure3D.ChunkParseDataOptions) : ExampleChunkOptions
	{
		const binaryReader = new Pure3D.Pure3DBinaryReader(options.arrayBuffer, options.isLittleEndian);

		const value1 = binaryReader.readUInt32();

		const value2 = binaryReader.readPure3DString();

		const value3 = binaryReader.readMatrix();

		return {
			value1,
			value2,
			value3,
		};
	}

	value1 : number;

	value2 : string;

	value3 : Pure3D.Matrix;

	constructor(options : Omit<Pure3D.ChunkOptions, "identifier"> & ExampleChunkOptions)
	{
		super(
			{
				...options,

				identifier: 0x1E240, // 123456, just an example
			});

		this.value1 = options.value1;

		this.value2 = options.value2;

		this.value3 = options.value3;
	}

	writeData(binaryWriter : Pure3D.Pure3DBinaryWriter) : void
	{
		binaryWriter.writeUInt32(this.value1);

		binaryWriter.writePure3DString(this.value2);

		binaryWriter.writeMatrix(this.value3);
	}
}
```

Then register it in your own `ChunkRegistry` instance:
```ts
const customChunkRegistry = new ChunkRegistry(
	{
		// Optionally, you can inherit from an existing chunk registry,
		//	like the one included with the library, by passing it here
		chunkRegistry: Pure3D.defaultChunkRegistry,
	});

customChunkRegistry.register(0x1E240, ExampleChunk);
```

Then use your custom registry when reading a file:
```ts
const rootChunk = Pure3D.File.read(
	{
		arrayBuffer,
		chunkRegistry: customChunkRegistry,
	});
```

## License
[MIT](https://github.com/donutteam/npm-pure3d/blob/main/LICENSE.md)