"use client";
import React from "react";
import PulsingLoader from "../components/PulsingLoader";
import { useEffect, useState } from "react";

export default function TermsOfService() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <PulsingLoader loading={loading} />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Условия пользования
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Дата вступления в силу:</strong>{" "}
                {new Date().toLocaleDateString("ru-RU")}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  1. Принятие условий
                </h2>
                <p className="text-gray-700 mb-4">
                  Используя наш веб-сайт и услуги, вы соглашаетесь с настоящими
                  Условиями пользования. Если вы не согласны с какими-либо
                  положениями, пожалуйста, не используйте наш сайт.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  2. Описание услуг
                </h2>
                <p className="text-gray-700 mb-4">
                  Мы предоставляем веб-разработку, дизайн и другие IT-услуги.
                  Все услуги предоставляются "как есть" без каких-либо гарантий.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  3. Регистрация и аккаунт
                </h2>
                <p className="text-gray-700 mb-4">
                  При регистрации вы обязуетесь:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Предоставлять точную и полную информацию</li>
                  <li>Сохранять конфиденциальность учетных данных</li>
                  <li>Нести ответственность за действия под вашим аккаунтом</li>
                  <li>
                    Немедленно уведомлять нас о несанкционированном
                    использовании
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  4. Правила использования
                </h2>
                <p className="text-gray-700 mb-4">Запрещается:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Использовать сайт для незаконной деятельности</li>
                  <li>Нарушать права интеллектуальной собственности</li>
                  <li>Распространять вредоносное ПО или спам</li>
                  <li>
                    Пытаться получить несанкционированный доступ к системам
                  </li>
                  <li>Нарушать работу сайта или серверов</li>
                  <li>Собирать данные других пользователей без разрешения</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  5. Интеллектуальная собственность
                </h2>
                <p className="text-gray-700 mb-4">
                  Весь контент на сайте, включая тексты, изображения, логотипы и
                  программный код, является собственностью нашей компании и
                  защищен законами об авторском праве.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  6. Контент пользователей
                </h2>
                <p className="text-gray-700 mb-4">
                  Загружая контент на наш сайт, вы предоставляете нам
                  неисключительную лицензию на его использование в рамках
                  предоставления услуг. Вы гарантируете, что обладаете правами
                  на такой контент.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  7. Оплата и возврат
                </h2>
                <p className="text-gray-700 mb-4">
                  Условия оплаты и возврата средств определяются в отдельных
                  соглашениях для каждого проекта. Все цены указаны без учета
                  налогов.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  8. Ограничение ответственности
                </h2>
                <p className="text-gray-700 mb-4">
                  Мы не несем ответственности за косвенные, случайные или
                  последующие убытки, возникшие в результате использования наших
                  услуг.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  9. Прекращение использования
                </h2>
                <p className="text-gray-700 mb-4">
                  Мы можем приостановить или прекратить доступ к сайту в любое
                  время без предварительного уведомления в случае нарушения
                  настоящих условий.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  10. Изменения условий
                </h2>
                <p className="text-gray-700 mb-4">
                  Мы оставляем за собой право изменять настоящие условия в любое
                  время. Изменения вступают в силу с момента их публикации на
                  сайте.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  11. Применимое право
                </h2>
                <p className="text-gray-700 mb-4">
                  Настоящие условия регулируются законодательством Российской
                  Федерации. Все споры разрешаются в соответствии с действующим
                  законодательством.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  12. Контактная информация
                </h2>
                <p className="text-gray-700 mb-4">
                  По вопросам, связанным с настоящими условиями, обращайтесь:
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> code.wave@yandex.com
                    <br />
                    <strong>Телефон:</strong> +7 (978) 020-08-52
                    <br />
                    <strong>Адрес:</strong> Симферополь, Крым, Россия
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
