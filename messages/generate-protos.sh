#!/bin/bash

# Path to the .proto files
PROTO_DIR="./"

# Output directories for generated code
CSHARP_OUT_DIR="./backend/Messages"
TS_OUT_DIR="./frontend/src/messages"

# Ensure output directories exist
mkdir -p ${CSHARP_OUT_DIR}
mkdir -p ${TS_OUT_DIR}

# Generate C# files
protoc -I=${PROTO_DIR} --csharp_out=${CSHARP_OUT_DIR} ${PROTO_DIR}/*.proto

# Generate TypeScript files
protoc --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --ts_out=${TS_OUT_DIR} -I ${PROTO_DIR} ${PROTO_DIR}/*.proto

echo "Protobuf contract files generated."
