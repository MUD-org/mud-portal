## Project Setup

The following steps go over what dependencies are required on your system to setup and run this project.

* Follow the instructions to install NVM ( https://github.com/nvm-sh/nvm )
* Follow the instructions to install PNPM ( https://pnpm.io/installation )

Run the following commands:
```sh
nvm install 18
nvm use 18

pnpm i
```

### Explanation
```sh
nvm install 18  # This install node version 18, which we use in the project
nvm use 18      # This tells your system we would like to use node 18 going forward

pnpm i          # Installs all the project dependencies
                # We use pnpm's monorepo system for running the entire project
pnpm run prep   # This performs the remaining setup processes
```

## Running The Project

Make sure you're in the root folder when you run this command. Your folder structure should look like:
```
/apps
/node_modules
README.md
```

When in the root folder, run the following command:
```sh
pnpm run dev
```

This command will start the backend and both frontends.

The client for MUDs runs at http://localhost:4000
The frontend for the rest of the website / auth flows runs at http://localhost:5000

It is not necessary to run dev again after changes are made. The backend will recompile on changes, and the frontends both watch for changes actively as well.