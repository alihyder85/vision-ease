/**
 * Reading ruler overlay - horizontal line that follows the cursor
 * Helps users track their reading position on the page
 */
export class ReadingRuler {
  private element: HTMLDivElement;
  private mouseListener: (e: MouseEvent) => void;

  constructor() {
    // Create ruler element
    this.element = document.createElement('div');
    this.element.style.position = 'fixed';
    this.element.style.top = '0';
    this.element.style.left = '0';
    this.element.style.width = '100vw';
    this.element.style.height = '3px';
    this.element.style.background = 'rgba(79, 156, 249, 0.6)';
    this.element.style.pointerEvents = 'none';
    this.element.style.zIndex = '999999';
    this.element.style.display = 'none';

    // Create mouse move listener
    this.mouseListener = (e: MouseEvent) => {
      const newTop = Math.max(0, e.clientY - 1);
      this.element.style.top = `${newTop}px`;
    };

    // Append to body
    document.body.appendChild(this.element);
  }

  /**
   * Show the ruler and attach mouse tracking
   */
  public show(): void {
    this.element.style.display = 'block';
    document.addEventListener('mousemove', this.mouseListener);
  }

  /**
   * Hide the ruler and remove mouse tracking
   */
  public hide(): void {
    this.element.style.display = 'none';
    document.removeEventListener('mousemove', this.mouseListener);
  }
}
