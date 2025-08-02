import type { VercelRequest, VercelResponse } from '@vercel/node';

const quotes = [
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs'
  },
  {
    quote: 'Stay hungry, stay foolish.',
    author: 'Steve Jobs'
  },
  {
    quote: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt'
  },
  {
    quote: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius'
  },
  {
    quote: 'Everything you can imagine is real.',
    author: 'Pablo Picasso'
  },
  {
    quote: 'You must be the change you wish to see in the world.',
    author: 'Mahatma Gandhi'
  }
];

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // --- CORS設定 ここから ---
  // すべてのドメインからのアクセスを許可する
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 許可するHTTPメソッド
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  // 許可するHTTPヘッダー
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONSメソッドへの対応（プリフライトリクエスト）
  // 本格的なリクエストの前に、ブラウザが「このリクエストを送って大丈夫？」と確認に来るためのものです。
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  // --- CORS設定 ここまで ---

  // --- 元のAPIロジック ---
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  return response.status(200).json(randomQuote);
}
