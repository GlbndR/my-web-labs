import { useState, useEffect } from 'react';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Відкриваємо форму через 1 хвилину (можеш змінити на 5000 для тесту - 5 сек)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer); // Очищення таймера
  }, []);

  // Функція для відправки даних на ТВІЙ власний сервер (Лаба 6)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки
    
    // Збираємо дані з форми
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: 'Нове повідомлення з резюме',
      message: `Телефон: ${formData.get('phone')}\n\nПовідомлення: ${formData.get('message')}`
    };

    try {
      // 🚨 УВАГА: Заміни це посилання на своє актуальне з localhost.run!
      const response = await fetch(' /api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Перетворюємо дані в JSON
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Повідомлення успішно відправлено на сервер!');
        setIsOpen(false); // Закриваємо модалку після відправки
      } else {
        alert('Помилка: ' + result.message);
      }
    } catch (error) {
      console.error('Помилка відправки:', error);
      alert('Не вдалося з\'єднатися з сервером. Перевір, чи запущений тунель.');
    }
  };

  if (!isOpen) return null; // Умовний рендеринг

  return (
    
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex justify-center items-center">
      
      <div className="bg-white p-6 rounded-xl w-96 text-black shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Зворотній зв'язок</h2>
        
        {/* Форма тепер викликає нашу функцію handleSubmit замість Formspree */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input type="text" name="name" placeholder="Ім'я" required className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="email" name="email" placeholder="Email" required className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="tel" name="phone" placeholder="Номер телефону" required className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
          <textarea name="message" placeholder="Ваше повідомлення" required className="border p-2 rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          
          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition-colors">Закрити</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">Відправити</button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

export default ContactForm;