/**
 * 성능 최적화 유틸리티
 * 
 * 애플리케이션의 성능을 최적화하기 위한 유틸리티 함수들을 제공합니다.
 */

/**
 * 디바운스 함수
 * 
 * 연속적인 함수 호출을 지연시켜 마지막 호출만 실행합니다.
 * 주로 검색, 창 크기 조절 등의 이벤트에 사용됩니다.
 * 
 * @param func 실행할 함수
 * @param delay 지연 시간 (밀리초)
 * @returns 디바운스된 함수
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * 스로틀 함수
 * 
 * 함수 호출 빈도를 제한하여 일정 시간 간격으로만 실행합니다.
 * 주로 스크롤, 마우스 이동 등의 이벤트에 사용됩니다.
 * 
 * @param func 실행할 함수
 * @param limit 제한 시간 (밀리초)
 * @returns 스로틀된 함수
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      lastRan = Date.now();
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * 메모이제이션 함수
 * 
 * 함수의 결과를 캐싱하여 동일한 입력에 대해 재계산을 방지합니다.
 * 
 * @param func 메모이제이션할 함수
 * @returns 메모이제이션된 함수
 */
export function memoize<T extends (...args: any[]) => any>(func: T): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = func(...args);
    cache.set(key, result);
    
    return result;
  };
} 