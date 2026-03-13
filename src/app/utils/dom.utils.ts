export function blurActiveElement(): void {
  const activeElement = document.activeElement as HTMLElement | null;
  activeElement?.blur();
}

export interface PopoverState {
  isOpen: boolean;
  event?: Event;
}

export function createClosedPopoverState(): PopoverState {
  return { isOpen: false, event: undefined };
}

export function createOpenPopoverState(event: Event): PopoverState {
  return { isOpen: true, event };
}

export function openPopoverFromEvent(event: Event): PopoverState {
  blurActiveElement();
  return createOpenPopoverState(event);
}

export function closePopover(): PopoverState {
  return createClosedPopoverState();
}
