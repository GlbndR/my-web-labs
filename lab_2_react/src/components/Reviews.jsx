import { useState, useEffect } from 'react';

function Reviews() {
  // Створюємо стан для збереження відгуків (початково це порожній масив)
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Виконуємо запит на сервер для 4-го варіанту
    fetch('https://jsonplaceholder.typicode.com/posts/4/comments')
      .then(response => response.json()) // Перетворюємо відповідь у формат JSON
      .then(data => setReviews(data))    // Зберігаємо отримані дані у наш стан
      .catch(error => console.error('Помилка при завантаженні відгуків:', error));
  }, []); // Порожній масив означає, що запит виконається лише один раз при завантаженні сторінки

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Проходимося по масиву відгуків і створюємо для кожного картку */}
      {reviews.map(review => (
        <div key={review.id} className="p-4 border rounded-xl shadow-md bg-white text-slate-800 hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-lg truncate" title={review.name}>{review.name}</h3>
          <p className="text-sm text-blue-500 mb-2 truncate">{review.email}</p>
          <p className="text-slate-600 line-clamp-4">{review.body}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;