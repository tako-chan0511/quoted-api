// Vercelのサーバーレス関数で使われるRequestとResponseの型をインポートします。
// これにより、TypeScriptが引数の型を正しく認識できるようになります。
import type { VercelRequest, VercelResponse } from '@vercel/node';

// このファイルは /api/quote というAPIエンドポイントになります。

// 返却する名言のリスト。APIの内部にデータを直接保持します。
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

// Vercelなどの環境でAPIリクエストを処理するためのハンドラー関数
// 引数に型(VercelRequest, VercelResponse)を指定することで、型エラーを解消します。
export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // quotes配列からランダムに1つの名言を選択
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // 200 OKステータスと共に、選択した名言をJSON形式で返す
  response.status(200).json(randomQuote);
}
