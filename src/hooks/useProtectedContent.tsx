import { useEffect, useCallback } from 'react';

/**
 * Hook to add view-only protection to placement data.
 * - Disables text selection on specified elements
 * - Disables right-click context menu on specified elements
 * 
 * @param selectors - CSS selectors for elements to protect
 */
export const useProtectedContent = (selectors: string[] = []) => {
  const handleContextMenu = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    
    // Check if the click is on a protected element
    const isProtected = selectors.some(selector => {
      const protectedElements = document.querySelectorAll(selector);
      return Array.from(protectedElements).some(el => el.contains(target));
    });
    
    if (isProtected) {
      e.preventDefault();
      return false;
    }
  }, [selectors]);

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [handleContextMenu]);
};

/**
 * CSS class to apply user-select: none to protected content.
 * Apply this class to placement table cells and modal content.
 */
export const protectedContentClass = 'protected-content';
