import { useState, useEffect } from 'react';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Відкриваємо форму через 1 хвилину
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer); // Очищення таймера
  }, []);

  if (!isOpen) return null; // Умовний рендеринг: якщо false, нічого не показуємо

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 text-black">
        <h2 className="text-xl font-bold mb-4">Зворотній зв'язок</h2>
        
        {/* Заміни ВАШ_ЕНДПОЙНТ на посилання з Formspree */}
        <form action="https://formspree.io/f/ВАШ_ЕНДПОЙНТ" method="POST" className="flex flex-col gap-3">
          <input type="text" name="name" placeholder="Ім'я" required className="border p-2 rounded" />
          <input type="email" name="email" placeholder="Email" required className="border p-2 rounded" />
          <input type="tel" name="phone" placeholder="Номер телефону" required className="border p-2 rounded" />
          <textarea name="message" placeholder="Ваше повідомлення" required className="border p-2 rounded h-24"></textarea>
          
          <div className="flex justify-between mt-4">
            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Закрити</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Відправити</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;