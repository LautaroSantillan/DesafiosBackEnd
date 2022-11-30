/* --------------------------- Modulos ----------------------------*/
const logger = require("../utils/logger");
const twilio = require('twilio');
const dotenv = require('dotenv').config();
/* --------- --------- */
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const PHONE_ADMIN = process.env.PHONE_ADMIN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;
/* --------- --------- */
const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
/* --------- --------- */

const sendNewOrder = async (order, user) => {
    try {
        const option = {
            from: TWILIO_PHONE_NUMBER,
            to: PHONE_ADMIN,
            body: `Se ha realizado un nuevo pedido por el usuario ${user.name} con el email: ${user.userEmail} y el teléfono: ${user.phone} con el siguiente detalle: ${order}`,
        }
        logger.info('Mensaje de orden enviado')
        await client.messages.create(option)
    } catch (error) {
        logger.error('Error en sendNewOrder', error)
    }
};

const sendWhatsApp = async (order, total, user) => {
    try {
        const option = {
            from: TWILIO_WHATSAPP_NUMBER,
            to: `whatsapp:${user.phone}`,
            body: `Se ha realizado un nuevo pedido por el usuario ${user.name} con el email: ${user.userEmail} y el teléfono: ${user.phone} con el siguiente detalle: ${order} \nTOTAL: $ ${total}`,
        }
        logger.info('Mensaje de orden enviado por WhatsApp')
        await client.messages.create(option)
    } catch (error) {
        logger.error('Error en sendWhatsApp', error)
    }
};

const sendWhatsAppAdmin = async (order, total, user) => {
    try {
        const option = {
            from: TWILIO_WHATSAPP_NUMBER,
            to: `whatsapp:${PHONE_ADMIN}`,
            body: `Se ha realizado un nuevo pedido por el usuario ${user.name} con el email: ${user.userEmail} y el teléfono: ${user.phone} con el siguiente detalle: ${order} \nTOTAL: $ ${total}`,
        }
        logger.info('Mensaje de orden enviado por WhatsApp')
        await client.messages.create(option)
    } catch (error) {
        logger.error('Error en sendWhatsApp', error)
    }
};

module.exports = { sendNewOrder, sendWhatsApp , sendWhatsAppAdmin }