import { Component, ComponentInterface, Host, Prop, h } from '@stencil/core';
import { GlobalConfig } from '@app/utils';
// import { } from './toast.types';

/**
 * @internal 
 * @group toolbar
 */
@Component({
  tag: 'plus-toolbar-spacer',
  styleUrl: 'toolbar-spacer.scss',
  shadow: true
})
export class ToolbarSpacer implements ComponentInterface {

  /**
   * TODO
   */
  @Prop()
  disabled?: boolean;

  @GlobalConfig('toolbarSpacer')
  config?;

  /**
   * External Methods
   */

  /**
   * Internal Methods
   */

  /**
   * Watchers
   */

  /**
   * Events handler
   */

  /**
   * Lifecycles
   */

  render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }
}
