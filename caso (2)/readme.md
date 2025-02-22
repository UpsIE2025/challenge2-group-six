# Historia de Usuario   

COMO un sistema de mensajería distribuida  
QUIERO implementar un canal de comunicación basado en el patrón Publish/Subscribe  
PARA garantizar que cada suscriptor reciba una copia única de cada evento publicado

## Criterios de Aceptación
* DADO un evento publicado en el canal de entrada, CUANDO el evento es procesado, ENTONCES se generará una copia del evento para cada suscriptor.
* DADO un canal de salida asignado a un suscriptor, CUANDO el suscriptor consuma el mensaje, ENTONCES el mensaje desaparecerá del canal de salida.
* DADO un suscriptor, CUANDO se suscriba a un canal, ENTONCES recibirá solo los eventos publicados después de su suscripción.
* DADO un mensaje en un canal de salida, CUANDO un suscriptor intente consumirlo nuevamente, ENTONCES no podrá hacerlo, ya que los mensajes se eliminan tras su consumo.