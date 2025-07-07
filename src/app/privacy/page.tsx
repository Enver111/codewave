import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Политика конфиденциальности</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Дата вступления в силу:</strong> {new Date().toLocaleDateString('ru-RU')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Общие положения</h2>
              <p className="text-gray-700 mb-4">
                Настоящая Политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу личную информацию при использовании нашего веб-сайта и услуг.
              </p>
              <p className="text-gray-700 mb-4">
                Используя наш сайт, вы соглашаетесь с условиями данной политики конфиденциальности.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Сбор информации</h2>
              <p className="text-gray-700 mb-4">Мы можем собирать следующие типы информации:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Персональные данные (имя, email, телефон)</li>
                <li>Информация об использовании сайта</li>
                <li>Техническая информация (IP-адрес, тип браузера)</li>
                <li>Данные, которые вы добровольно предоставляете</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Использование информации</h2>
              <p className="text-gray-700 mb-4">Собранная информация используется для:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Предоставления и улучшения наших услуг</li>
                <li>Обработки заказов и запросов</li>
                <li>Связи с вами по вопросам обслуживания</li>
                <li>Анализа использования сайта</li>
                <li>Предотвращения мошенничества</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Защита информации</h2>
              <p className="text-gray-700 mb-4">
                Мы принимаем соответствующие меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Передача данных третьим лицам</h2>
              <p className="text-gray-700 mb-4">
                Мы не продаем, не обмениваем и не передаем вашу личную информацию третьим лицам без вашего согласия, за исключением случаев, предусмотренных законом.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Файлы cookie</h2>
              <p className="text-gray-700 mb-4">
                Наш сайт использует файлы cookie для улучшения пользовательского опыта. Вы можете отключить cookies в настройках вашего браузера.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Ваши права</h2>
              <p className="text-gray-700 mb-4">Вы имеете право:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Получить доступ к своим персональным данным</li>
                <li>Исправить неточные данные</li>
                <li>Удалить свои данные</li>
                <li>Ограничить обработку данных</li>
                <li>Отозвать согласие на обработку</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Изменения в политике</h2>
              <p className="text-gray-700 mb-4">
                Мы оставляем за собой право изменять данную политику конфиденциальности. Изменения вступают в силу с момента их публикации на сайте.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Контактная информация</h2>
              <p className="text-gray-700 mb-4">
                Если у вас есть вопросы относительно данной политики конфиденциальности, пожалуйста, свяжитесь с нами:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@codewave.com<br />
                  <strong>Телефон:</strong> +7 (XXX) XXX-XX-XX<br />
                  <strong>Адрес:</strong> [Ваш адрес]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
