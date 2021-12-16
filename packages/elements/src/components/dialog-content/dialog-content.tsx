import { Element, Property } from '@htmlplus/element/decorators';

/**
 * @slot default - The default slot.
 */
@Element()
export class DialogContent {

  /**
   * It makes the user able to scroll the content by adding a scroll beside it.
   */
  @Property({ reflect: true })
  scrollable?: boolean;

  render() {
    return (
      <slot />
    )
  }
}