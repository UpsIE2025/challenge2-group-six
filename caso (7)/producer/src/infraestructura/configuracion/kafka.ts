
interface KafkaConfig {
    clientId: string;
    brokers: string[];
    topic: string;
}

const config: KafkaConfig = {
    clientId: 'telegrafo',
    brokers: ['localhost:9092'],
    topic: 'telegrafo'
};

export default config;
