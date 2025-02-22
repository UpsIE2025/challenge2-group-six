package ec.edu.ups.kafka.consumer.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationsConsumer {

    private static final Logger log = LoggerFactory.getLogger(NotificationsConsumer.class);

    @KafkaListener(topics = "${spring.kafka.topic}", groupId = "${spring.kafka.groupId.notifications}")
    public void consumeMessage(String message) {
        log.info("Received message: {}", message);
    }

}
