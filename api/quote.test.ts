import { describe, it, expect, vi } from 'vitest';
import handler from './quote'; // テスト対象のAPIハンドラー
import type { VercelRequest, VercelResponse } from '@vercel/node';

// VercelResponseのモック（偽物）を作成するヘルパー関数
// これにより、実際のレスポンスを送信せずにテストができます。
const mockResponse = () => {
  const res: Partial<VercelResponse> = {};
  // res.status() と res.json() が呼ばれたことを記録するモック関数に置き換える
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res as VercelResponse;
};

// VercelRequestのモックを作成 (今回はリクエスト内容は使わないが、形式として用意)
const mockRequest = () => {
  return {} as VercelRequest;
};

describe('API Handler: /api/quote', () => {

  // テストケース1: ステータスコード200が返されることを確認
  it('should return a 200 status code', () => {
    const req = mockRequest();
    const res = mockResponse();
    
    handler(req, res); // APIハンドラーを実行
    
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // テストケース2: JSON形式で、'quote'と'author'プロパティを持つオブジェクトが返されることを確認
  it('should return a JSON object with quote and author properties', () => {
    const req = mockRequest();
    const res = mockResponse();

    handler(req, res);
    
    // res.jsonが呼ばれたことを確認
    expect(res.json).toHaveBeenCalled();
    
    // res.jsonに渡された引数（レスポンスボディ）を取得
    const jsonResponse = vi.mocked(res.json).mock.calls[0][0];

    // レスポンスボディに必要なプロパティがあるか確認
    expect(jsonResponse).toHaveProperty('quote');
    expect(jsonResponse).toHaveProperty('author');
  });

  // テストケース3: 返される各プロパティの型が文字列であることを確認
  it('should return properties of type string', () => {
    const req = mockRequest();
    const res = mockResponse();

    handler(req, res);

    const jsonResponse = vi.mocked(res.json).mock.calls[0][0];

    // プロパティの型が文字列であることを確認
    expect(typeof jsonResponse.quote).toBe('string');
    expect(typeof jsonResponse.author).toBe('string');
  });
});
