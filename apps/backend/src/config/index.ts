import fs from 'fs';
import yaml from 'yaml';
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  server: {
    port: number;
    name: string;
  };
  cors: {
    origin: Array<string>
  };
  auth: {
    tokenSecret: string,
    audiences: Array<string>
  };
}

const file = fs.readFileSync('config.yaml', 'utf8');
const defaultConfig: Config = yaml.parse(file);

// Recursive function to override with environment variables
function overrideConfig(config: any, parentKey: string = ''): any {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        const envKey = `${parentKey}${parentKey.length > 0 ? '_' : ''}${key}`.toUpperCase();
        if (typeof config[key] === 'object' && config[key] !== null) {
          config[key] = overrideConfig(config[key], envKey);
        } else {
          config[key] = process.env[envKey] || config[key];
        }
      }
    }
    return config;
  }
  
  const config: Config = overrideConfig(defaultConfig);

export default config;