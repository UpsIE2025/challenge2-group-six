package ec.ups.ms.kafka;

import ec.ups.ms.kafka.model.Order;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String, Order> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, Order> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String topic, Order order) {
        kafkaTemplate.send(topic, order);
        System.out.printf("Topic message sent: %1$s", topic);
    }
}