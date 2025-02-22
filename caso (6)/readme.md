# Historia de Usuario   

COMO un sistema de mensajería distribuida  
QUIERO implementar un canal de comunicación basado en el patrón Guaranteed/Delivery  
PARA garantizar que se reciban los mensajes 

## Criterios de Aceptación
* DADO un evento publicado en el canal de entrada, CUANDO el evento es procesado, Entonces se realizará persistencia del evento hasta confirmar la recepción del evento por parte del suscriptor.
* DADO un canal de salida asignado a un suscriptor, CUANDO el suscriptor consuma el mensaje, ENTONCES el mensaje no desaparecerá del canal de salida.