import fs from 'fs';
import convict from 'convict';

// Define a schema
const config = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
  instanceId: {
    format: '*',
    default: '',
    env: 'INSTANCE',
    arg: 'instance',
  },
  title: {
    format: '*',
    default: 'Демонстрационная встреча',
  },
  raven: {
    enabled: {
      format: Boolean,
      default: false,
    },
    publicDSN: {
      format: '*',
      default: '',
    },
    DSN: {
      format: '*',
      default: '',
    },
  },
  vkAppId: {
    format: 'int',
    default: 5820504,
  },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`./config/env/${env}.json`);

const instanceId = config.get('instanceId');
if (instanceId) {
  config.loadFile(`./config/instances/${instanceId}.json`);
}

const localConfFile = './config/local.json';

if (fs.existsSync(localConfFile)) {
  config.loadFile(localConfFile);
}

// Perform validation
config.validate({ strict: true });

export default config;
