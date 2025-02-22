package ec.edu.ups.kafka.producer.components;

import ec.edu.ups.kafka.producer.model.Event;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class ProducerComponent {

    private static final Logger log = LoggerFactory.getLogger(ProducerComponent.class);

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final String topic;

    public ProducerComponent(KafkaTemplate<String, String> kafkaTemplate,
                             @Value("${spring.kafka.producer.topic}") String topic) {
        this.kafkaTemplate = kafkaTemplate;
        this.topic = topic;
    }

    public void sendEvent(Event event) throws ExecutionException, InterruptedException {

        var message = String.format("Send event - ID: %s, message: %s", event.id(), event.message());

        SendResult<String, String> sendResult = this.kafkaTemplate.send(this.topic, message).get();
        log.info("Event sent via Kafka, {}", event.message());
        log.info("Send result Kafka, {}", sendResult.toString());

    }

}
