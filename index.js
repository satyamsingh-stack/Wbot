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

    // Outside office hours response
    if (hour >= 22 || hour <= 8) {
        await message.reply(
            "Hello 👋\nI'm currently unavailable. My Office timing is in between 8:00 AM to 10:00 PM"
        );
        return;
    }

    // Greetings
    if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('good morning') || text.includes('good afternoon') || text.includes('good evening')) {
        await message.reply(
            "Hi 👋\nThanks for your message. Let me know how can I help you."
        );
    }
    // How are you
    else if(text.includes('how are you') || text.includes('how r u') || text.includes('howdy')) {
        await message.reply(
            "I'm doing great, thank you for asking! 😊\nHow can I assist you today?"
        );
    }
    // Thank you / Thanks
    else if(text.includes('thank') || text.includes('thx') || text.includes('thanks')) {
        await message.reply(
            "You're welcome! 😊\nIs there anything else I can help you with?"
        );
    }
    // Services inquiry
    else if(text.includes('service') || text.includes('what do you do') || text.includes('help me')) {
        await message.reply(
            "We provide the following services:\n\n" +
            "• Web Development\n" +
            "• Mobile App Development\n" +
            "• UI/UX Design\n" +
            "• Digital Marketing\n" +
            "• Consulting\n\n" +
            "Which service are you interested in?"
        );
    }
    // Pricing / Cost
    else if(text.includes('price') || text.includes('cost') || text.includes('pricing') || text.includes('fee')) {
        await message.reply(
            "Our pricing depends on the project requirements.\n\n" +
            "Could you please share more details about your project?\n" +
            "I'll get back to you with a customized quote."
        );
    }
    // Contact info
    else if(text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('reach')) {
        await message.reply(
            "You can contact us on this number only."
        );
    }
    // Working hours
    else if(text.includes('hours') || text.includes('timing') || text.includes('open') || text.includes('available')) {
        await message.reply(
            "Our working hours are:\n\n" +
            "Monday - Friday: 8:00 AM - 10:00 PM\n" +
            "Saturday: 10:00 AM - 2:00 PM\n" +
            "Sunday: Closed\n\n" +
            "Note: Our bot is available 8 AM to 10 PM"
        );
    }
    // Goodbye
    else if(text.includes('bye') || text.includes('goodbye') || text.includes('see you') || text.includes('talk to you later')) {
        await message.reply(
            "Goodbye! 👋\nIt was nice chatting with you.\nFeel free to reach out anytime. Have a great day!"
        );
    }
    // Name inquiry
    else if(text.includes('your name') || text.includes('who are you') || text.includes('what is your name')) {
        await message.reply(
            "I'm an automated assistant bot build by Satyam 🤖\nI'm here to help you with your queries and provide information about our services."
        );
    }
    // About company
    else if(text.includes('about') || text.includes('company') || text.includes('who is') || text.includes('tell me about')) {
        await message.reply(
            "We're a professional software development company specializing in:\n\n" +
            "✓ Web Applications\n" +
            "✓ Mobile Apps\n" +
            "✓ Custom Solutions\n" +
            "✓ Technical Support\n\n" +
            "We have been serving clients for over 5 years with quality deliverables."
        );
    }
    // Yes confirmation
    else if(text.includes('yes') || text.includes('yeah') || text.includes('sure') || text.includes('okay') || text.includes('ok')) {
        await message.reply(
            "Great! 😊 Please share more details about what you need, and I'll assist you accordingly."
        );
    }
    // No response
    else if(text.includes('no') || text.includes('nope') || text.includes('not')) {
        await message.reply(
            "No problem! 👍\nIf you have any other questions or need assistance with something else, just let me know."
        );
    }
    // Want to discuss / Ready for conversation
    else if(text.includes('i want to discuss') || text.includes('discuss') || text.includes('talk about')) {
        await message.reply(
            "Yes please go ahead.\nI'm listening... 🎧"
        );
    }
    // Default fallback response
    else {
        await message.reply(
            "Thanks for reaching out 🙏\nI'll get back to you as soon as possible.\n\n" +
            "You can also ask me about:\n" +
            "• Our Services\n" +
            "• Pricing\n" +
            "• Working Hours\n" +
            "• Contact Information"
        );
    }
});

client.initialize();