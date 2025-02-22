package ec.ups.ms.kafka;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import ec.ups.ms.kafka.model.Order;

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

    @KafkaListener(topics = "document", groupId = "test-group")
    public void listenDocument(ConsumerRecord<String, Order> consumerRecord) {
        System.out.println("Topic 'document' recibe customer: " + consumerRecord.value().toString());
    }
}
