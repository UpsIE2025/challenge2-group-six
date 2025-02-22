# 📨 Implementación de Command Message

Este proyecto implementa el **patrón Command Message**, permitiendo que los sistemas envíen **comandos como mensajes** para ejecutar procedimientos de manera confiable en otra aplicación.  
Los mensajes contienen el método y los parámetros necesarios para su ejecución, asegurando su correcta interpretación y procesamiento por el sistema destino.  

Además, el sistema maneja la serialización de los mensajes, la validación de su entrega y la reejecución en caso de fallas.  

---
## Historia de Usuario: Command Message

### 🎯 **Historia de Usuario**
**COMO** desarrollador de integración  
**QUIERO** enviar comandos como mensajes entre sistemas  
**PARA** ejecutar procedimientos de manera confiable en otra aplicación  

### ✅ **Criterios de Aceptación**
- **DADO** que un sistema necesita invocar un procedimiento en otro sistema,  
  **CUANDO** se genere un mensaje de comando,  
  **ENTONCES** este debe contener el método y parámetros necesarios para su ejecución en el sistema destino.  
- **DADO** que el mensaje de comando puede ser serializable,  
  **CUANDO** el sistema receptor lo procese,  
  **ENTONCES** debe interpretar correctamente el objeto y ejecutar el comando.  
- **DADO** que pueden ocurrir fallas en la transmisión,  
  **CUANDO** un mensaje no pueda ser procesado,  
  **ENTONCES** debe registrarse un error y reintentarse si es necesario.  

---

#### 🌍**Caso: Sincronización de precios en una plataforma de trading**
Un sistema de análisis financiero necesita obtener el precio más reciente de una acción desde un servicio externo. Para ello, envía un **mensaje de comando** con la solicitud `getLastTradePrice("DIS")` al servicio de datos bursátiles. El servicio receptor interpreta el mensaje, ejecuta la consulta y responde con el precio actualizado.  

✅ *Resultado:* La plataforma de trading recibe la información sin necesidad de una conexión directa y puede procesar los datos de manera eficiente.
