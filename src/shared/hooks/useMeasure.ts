import { useCallback, useLayoutEffect, useRef, useState } from "react";

type UseMeasureOptions<T> = {
  element?: React.RefObject<T | null>;
  selector?: string;
  node?: T | null;
};

export function useMeasure<T>({
  element,
  selector,
  node: elementNode,
}: UseMeasureOptions<T> = {}) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const node = useRef<HTMLElement>(null);

  const getNode = useCallback(
    (itemNode?: unknown) => {
      const enabled = !!(
        element?.current ||
        selector ||
        elementNode ||
        itemNode
      );
      if (!enabled) return null;

      let el: HTMLElement | null = null;
      const setEl = (candidate: unknown) => {
        if (candidate && candidate instanceof HTMLElement) return candidate;
        return el;
      };

      el = setEl(elementNode);
      el = setEl(element?.current);
      el = setEl(itemNode);
      if (selector) el = setEl(document.querySelector(selector));

      if (!el || !(el instanceof HTMLElement)) return null;
      if (!itemNode) node.current = el;

      return el;
    },
    [element, selector, elementNode],
  );

  const getDimensions = useCallback(
    (itemNode?: unknown) => {
      const el = getNode(itemNode);
      if (!el) return;

      const { width: rectWidth, height: rectHeight } = el.getBoundingClientRect();
      const { offsetLeft, offsetTop } = el;

      setHeight(rectHeight);
      setWidth(rectWidth);
      setTop(offsetTop);
      setLeft(offsetLeft);

      return {
        height: rectHeight,
        width: rectWidth,
        offsetTop,
        offsetLeft,
      };
    },
    [getNode],
  );

  const getScrollDimensions = useCallback(
    (itemNode?: unknown) => {
      const el = getNode(itemNode);
      if (!el) return;

      const {
        scrollWidth: elScrollWidth,
        scrollHeight: elScrollHeight,
        scrollLeft: elScrollLeft,
      } = el;

      setScrollWidth(elScrollWidth);
      setScrollHeight(elScrollHeight);
      setScrollLeft(elScrollLeft);

      return {
        scrollWidth: elScrollWidth,
        scrollHeight: elScrollHeight,
        scrollLeft: elScrollLeft,
      };
    },
    [getNode],
  );

  const getNodeDimensions = useCallback(
    <N>(item: N | null | undefined) => {
      const scrollDimensions = getScrollDimensions(item);
      const rectDimensions = getDimensions(item);

      return { ...(scrollDimensions ?? {}), ...(rectDimensions ?? {}) };
    },
    [getScrollDimensions, getDimensions],
  );

  useLayoutEffect(() => {
    getDimensions();
    getScrollDimensions();

    const el = getNode();
    if (!el) return;

    const observer = new ResizeObserver(() => {
      getDimensions();
      getScrollDimensions();
    });

    observer.observe(el);
    el.addEventListener("scroll", getScrollDimensions);

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", getScrollDimensions);
    };
  }, [getDimensions, getScrollDimensions, getNode]);

  return {
    height,
    width,
    offsetTop: top,
    offsetLeft: left,
    scrollHeight,
    scrollWidth,
    scrollLeft,
    node,
    getNodeDimensions,
  };
}
