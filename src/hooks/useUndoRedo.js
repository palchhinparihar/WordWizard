import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for managing undo/redo functionality
 * @param {string} initialValue - Initial text value
 * @param {number} maxHistorySize - Maximum number of history states to keep
 * @returns {Object} - Undo/redo state and functions
 */
export const useUndoRedo = (initialValue = '', maxHistorySize = 50) => {
  const [history, setHistory] = useState([initialValue]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isUndoRedoAction = useRef(false);

  const currentValue = history[currentIndex];

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const addToHistory = useCallback((newValue) => {
    // Don't add to history if it's the same as current value
    if (newValue === currentValue) return;

    // Don't add to history if this is an undo/redo action
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    setHistory(prevHistory => {
      const newHistory = prevHistory.slice(0, currentIndex + 1);
      newHistory.push(newValue);
      
      // Limit history size
      if (newHistory.length > maxHistorySize) {
        return newHistory.slice(-maxHistorySize);
      }
      
      return newHistory;
    });
    
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      return Math.min(newIndex, maxHistorySize - 1);
    });
  }, [currentValue, currentIndex, maxHistorySize]);

  const undo = useCallback(() => {
    if (canUndo) {
      isUndoRedoAction.current = true;
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      isUndoRedoAction.current = true;
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [canRedo]);

  const reset = useCallback((newValue = '') => {
    setHistory([newValue]);
    setCurrentIndex(0);
    isUndoRedoAction.current = false;
  }, []);

  return {
    currentValue,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
    historyLength: history.length,
    currentIndex
  };
};
