package ec.ups.ms.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "query", groupId = "test-group")
    public void listenQuery(ConsumerRecord<String, String> record) {
        System.out.println("Topic 'query' recibe: " + record.value());
    }

    @KafkaListener(topics = "price", groupId = "test-group")
    public void listenPrice(ConsumerRecord<String, String> record) {
        System.out.println("Topic 'price' recibe: " + record.value());
    }

    @KafkaListener(topics = "purchase", groupId = "test-group")
    public void listenPurchase(ConsumerRecord<String, String> record) {
        System.out.println("Topic 'purchase' recibe: " + record.value());
    }
}
