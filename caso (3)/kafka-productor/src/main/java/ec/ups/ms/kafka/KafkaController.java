package ec.ups.ms.kafka;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kafka")
public class KafkaController {

    private final KafkaProducerService producerService;

    public KafkaController(KafkaProducerService producerService) {
        this.producerService = producerService;
    }

    @PostMapping("/send")
    public String sendMessage(@RequestParam String topic, @RequestParam String message) {
        String[] availableTopics = {"query", "price", "purchase"};

        boolean topicIsFound = java.util.Arrays.asList(availableTopics).contains(topic);

        if (topicIsFound) {
            producerService.sendMessage(topic, message);
            return String.format("Mensaje enviado al topic %1$s!", topic);
        } else {
            return String.format("El topic %1$s no existe!", topic);
        }
    }
}

