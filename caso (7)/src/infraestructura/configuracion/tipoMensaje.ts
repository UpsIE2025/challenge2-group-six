// Definimos una constante con tipos explícitos
const MessageTypes: { [key: string]: string } = {
    STRING: 'string',
    INT: 'int',
    FILE: 'file',
    FACTURA: 'factura',
    ORDEN_DE_PAGO: 'orden_de_pago',
    TEXTO: 'texto'
};

// Exportamos la constante
export default MessageTypes;
