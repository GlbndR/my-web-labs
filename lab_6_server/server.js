require('dotenv').config(); // Завантажуємо секретні дані з .env
const fastify = require('fastify')({ logger: true }); // Ініціалізуємо Fastify
const path = require('path');
const { Resend } = require('resend');

// Ініціалізуємо Resend з ключем із .env
const resend = new Resend(process.env.RESEND_API_KEY);

// Дозволяємо підключення з фронтенду (Cors)
fastify.register(require('@fastify/cors'));

// Налаштовуємо роздачу статичних файлів з папки public/
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/', // Файли будуть доступні в корені сайту
});

// Створюємо POST-ендпоінт для форми
fastify.post('/api/contact', async (request, reply) => {
    // Отримуємо дані з тіла запиту
    const { name, email, subject, message } = request.body; 

    // Базова валідація
    if (!name || !email || !message) {
        return reply.status(400).send({ success: false, message: 'Всі поля обов\'язкові!' });
    }

    try {
        // Відправляємо лист через Resend
        // Важливо: на безкоштовному тарифі можна відправляти лише з цієї адреси
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>', 
            to: process.env.MY_EMAIL, // Відправляємо на твою пошту
            subject: subject || `Нове повідомлення з резюме від: ${name}`,
            html: `<p><strong>Ім'я:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Повідомлення:</strong> <br/> ${message}</p>`
        });

        // Повертаємо успішну відповідь
        return reply.status(200).send({ success: true, message: 'Лист успішно відправлено!' });
    } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ success: false, message: 'Помилка при відправці' });
    }
});

// Запуск сервера
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
        console.log(`Сервер працює на http://localhost:${process.env.PORT || 3000}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();