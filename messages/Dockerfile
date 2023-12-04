# Use a base image with protoc installed or install it in this Dockerfile
FROM ubuntu:latest

RUN apt-get update && apt-get install -y protobuf-compiler

# Install Node.js and npm if not already included
RUN apt-get install -y nodejs npm

# Install protobuf-ts for TypeScript generation
RUN npm install -g protobuf-ts

# Set a working directory for generation
WORKDIR /proto-gen

# Copy the generation script into the container
COPY generate-protos.sh /proto-gen/generate-protos.sh

# Ensure the script is executable
RUN chmod +x /proto-gen/generate-protos.sh

# This script runs when the Docker container is started
ENTRYPOINT ["/proto-gen/generate-protos.sh"]
