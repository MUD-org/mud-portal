docker build -t proto-generator ./messages
docker run -v ./frontend:/proto-gen/frontend -v ./backend:/proto-gen/backend proto-generator