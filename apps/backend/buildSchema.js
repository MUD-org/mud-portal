const fs = require('fs');
const yaml = require('yaml');
const { exec } = require('child_process');

const configFile = fs.readFileSync('config.yaml', 'utf8');
const config = yaml.parse(configFile);

const connectionString = config.databaseConnectionString; // Adjust this according to your YAML structure

const command = `npx @databases/pg-schema-cli --database postgres://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name} --directory src/__generated__`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Output: ${stdout}`);
});
