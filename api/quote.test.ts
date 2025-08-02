import { describe, it, expect, vi } from 'vitest';
import handler from './quote'; // テスト対象のAPIハンドラー
import type { VercelRequest, VercelResponse } from '@vercel/node';

// VercelResponseのモック（偽物）を作成するヘルパー関数
const mockResponse = () => {
  const res: Partial<VercelResponse> = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  // setHeaderとendもモック関数として追加
  res.setHeader = vi.fn().mockReturnValue(res);
  res.end = vi.fn().mockReturnValue(res);
  return res as VercelResponse;
};

// VercelRequestのモックを作成。HTTPメソッドを指定できるように改良。
const mockRequest = (method: string = 'GET') => {
  return { method } as VercelRequest;
};

describe('API Handler: /api/quote', () => {

  // --- 既存のテスト ---
  it('should return a 200 status code on GET request', () => {
    const req = mockRequest('GET');
    const res = mockResponse();
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return a JSON object with quote and author properties on GET request', () => {
    const req = mockRequest('GET');
    const res = mockResponse();
    handler(req, res);
    const jsonResponse = vi.mocked(res.json).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty('quote');
    expect(jsonResponse).toHaveProperty('author');
  });

  // --- CORS関連の新しいテスト ---
  it('should set Access-Control-Allow-Origin header to *', () => {
    const req = mockRequest('GET');
    const res = mockResponse();
    handler(req, res);
    // 'Access-Control-Allow-Origin'ヘッダーが'*'で設定されているか確認
    expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
  });

  it('should handle OPTIONS preflight request', () => {
    const req = mockRequest('OPTIONS'); // メソッドをOPTIONSに設定
    const res = mockResponse();
    handler(req, res);

    // ステータス200が返されることを確認
    expect(res.status).toHaveBeenCalledWith(200);
    // レスポンスボディは空であることを確認 (end()が呼ばれる)
    expect(res.end).toHaveBeenCalled();
    // JSONは返されないことを確認
    expect(res.json).not.toHaveBeenCalled();
  });
});
