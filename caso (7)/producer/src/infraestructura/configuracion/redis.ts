interface RedisConfig {
    host: string;
    port: string;
}

const config: RedisConfig = {
    host: 'localhost',
    port: '6379'
};

export default config;