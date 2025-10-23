import { describe, it, expect, vi } from 'vitest';
import { getTextOperations } from './textUtils';

describe('getTextOperations', () => {
  describe('handleExtraSpaces', () => {
    it('should replace multiple spaces and tabs with a single space', () => {
      const text = 'hello   world\twith\t\tmultiple spaces';
      const setText = vi.fn();
      const setPreviewText = vi.fn();
      const props = { showAlert: vi.fn() };
      const styles = {};
      const operations = getTextOperations(text, setText, '', setPreviewText, vi.fn(), props, vi.fn(), vi.fn(), styles, vi.fn(), 0);
      const handleExtraSpaces = operations.find(op => op.id === 'remove-extra-spaces').func;

      handleExtraSpaces();

      expect(setPreviewText).toHaveBeenCalledWith('hello world with multiple spaces');
    });
  });
});
