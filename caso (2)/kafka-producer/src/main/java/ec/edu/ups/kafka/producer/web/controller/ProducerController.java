package ec.edu.ups.kafka.producer.web.controller;

import ec.edu.ups.kafka.producer.components.ProducerComponent;
import ec.edu.ups.kafka.producer.model.Event;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/producer")
public class ProducerController {

    private final ProducerComponent producerComponent;

    @PostMapping
    public ResponseEntity<String> sendMessage(@RequestBody Event event) throws ExecutionException, InterruptedException {
        this.producerComponent.sendEvent(event);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
