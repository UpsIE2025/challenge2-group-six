package ec.ups.ms.kafka;

import org.springframework.web.bind.annotation.*;
import ec.ups.ms.kafka.model.Order;

@RestController
@RequestMapping("/api/kafka")
public class KafkaController {

    private final KafkaProducerService producerService;

    public KafkaController(KafkaProducerService producerService) {
        this.producerService = producerService;
    }

    @PostMapping("/send")
    public String sendMessage(@RequestParam String topic, @RequestBody Order order) {
        producerService.sendMessage(topic, order);
        return String.format("Mensaje enviado al topic %1$s!", topic);
    }
}

