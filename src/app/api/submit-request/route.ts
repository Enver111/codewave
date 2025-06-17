import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('API endpoint called');

    const body = await request.json();
    const {
      firstName,
      lastName,
      middleName,
      phone,
      email,
      projectType,
      totalPrice,
      selectedFeatures,
    } = body;

    console.log('Received data:', { firstName, lastName, phone, email, projectType, totalPrice });

    // Форматируем цену
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
    };

    // Получаем названия выбранных функций
    const features = selectedFeatures.map((featureId: string) => {
      const featureMap: { [key: string]: string } = {
        responsive: 'Адаптивный дизайн',
        seo: 'SEO-оптимизация',
        cms: 'CMS система',
        analytics: 'Аналитика',
        payment: 'Платежные системы',
        api: 'API интеграции',
      };
      return featureMap[featureId] || featureId;
    });

    // Получаем название типа проекта
    const projectTypeMap: { [key: string]: string } = {
      landing: 'Лендинг',
      corporate: 'Корпоративный сайт',
      ecommerce: 'Интернет-магазин',
      webapp: 'Веб-приложение',
    };

    // Создаем текст письма
    const emailText = `
Новая заявка на проект

Информация о клиенте:
Фамилия: ${lastName}
Имя: ${firstName}
Отчество: ${middleName || 'Не указано'}
Телефон: ${phone}
Email: ${email}

Детали проекта:
Тип проекта: ${projectTypeMap[projectType] || projectType}
Предварительная стоимость: ${formatPrice(totalPrice)}

Выбранные функции:
${features.join(', ')}

---
Отправлено с сайта CodeWave
    `.trim();

    console.log('=== НОВАЯ ЗАЯВКА ===');
    console.log(emailText);
    console.log('===================');

    // Сохраняем в файл (гарантированно работает)
    saveToFile(emailText);

    // Уведомляем о сохранении
    console.log('Заявка сохранена в файл applications.txt');

    return NextResponse.json({
      success: true,
      message: 'Заявка получена и сохранена',
      data: {
        firstName,
        lastName,
        phone,
        email,
        projectType: projectTypeMap[projectType] || projectType,
        totalPrice: formatPrice(totalPrice),
        features
      }
    });

  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json(
      {
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Функция сохранения в файл
function saveToFile(content: string) {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'applications.txt');
  fs.appendFileSync(filePath, `\n\n=== НОВАЯ ЗАЯВКА ${new Date().toISOString()} ===\n${content}\n`);
  console.log('Data saved to file:', filePath);
}
