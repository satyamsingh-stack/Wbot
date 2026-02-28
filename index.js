const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
});

client.on('qr', qr => {
    console.log('Scan this QR with WhatsApp');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Bot is running...');
});

client.on('message', async message => {
    if (message.from.includes('@g.us')) return;

    const hour = new Date().getHours();
    const text = message.body.toLowerCase();

    if (hour >= 22 || hour <= 8) {
        await message.reply(
            "Hello 👋\nI'm currently unavailable. My Office timing is in between 8:00 AM to 10:00 PM"
        );
        return;
    }

    if (text.includes('hi') || text.includes('hello')) {
        await message.reply(
            "Hi 👋\nThanks for your message. Let me know how can I help you...."
        );
    }
    else if(text.includes('i want to discuss something') || text.includes('service')) {
        await message.reply(
            "Yes please go ahead."
        );
    }
    else if(text.includes('i am danish') || text.includes('danish')) {
        await message.reply(
            "Hi Danish"
        );
    }
    else {
        await message.reply(
            "Thanks for reaching out 🙏\nI’ll get back to you as soon as possible."
        );
    }
});

client.initialize();