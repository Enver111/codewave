import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { siteType, template, contact, comment } = data;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return NextResponse.json({ error: 'Telegram credentials not set' }, { status: 500 });
    }

    const text = `📝 Новый заказ с сайта\n\n` +
      `Тип сайта: ${siteType || '-'}\n` +
      `Макет: ${template || '-'}\n` +
      `Имя: ${contact?.name || '-'}\n` +
      `Email: ${contact?.email || '-'}\n` +
      `Телефон: ${contact?.phone || '-'}\n` +
      (comment ? `Пожелания: ${comment}\n` : '');

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      })
    });
    if (!tgRes.ok) {
      const err = await tgRes.text();
      return NextResponse.json({ error: 'Telegram error', details: err }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: (e as any).message }, { status: 500 });
  }
}
