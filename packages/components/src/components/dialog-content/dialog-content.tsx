import { Component, Property } from '@htmlplus/compiler/client';

/**
 * @slot default - The default slot.
 */
@Component()
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
