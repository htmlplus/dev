import { Bind, Component, Event, EventEmitter, Property, Watch } from '@htmlplus/compiler/dist/client';
import * as Helpers from '@app/helpers';
import { ClickOutside as ClickOutsideCore } from '@app/services';

/**
 * @slot default - The default slot.
 */
@Component()
export class ClickOutside {

  /**
   * Disable the component.
   */
  @Property({ reflect: true })
  disabled?: boolean;

  /**
   * The callback occurs only once.
   */
  @Property()
  once?: boolean;

  /**
  * Emitted when outside of the component is clicked.
  */
  @Event({ cancelable: true })
  plusClickOutside!: EventEmitter<void>;

  get $host() {
    return Helpers.host(this);
  }

  /**
   * Internal Methods
   */

  bind() {
    ClickOutsideCore.on(this.$host, this.onClickOutside);
  }

  unbind() {
    ClickOutsideCore.off(this.$host);
  }

  rebind() {
    this.unbind();
    this.bind();
  }

  /**
   * Watchers
   */

  @Watch('disabled', 'once')
  watcher(next, prev, name) {

    switch (name) {

      case 'disabled':
        next ? this.unbind() : this.bind();
        break;

      case 'once':
        this.rebind();
        break;
    }
  }

  /**
   * Events handler
   */

  @Bind()
  onClickOutside() {
    this.once && this.unbind();
    this.plusClickOutside();
  }

  /**
   * Lifecycles
   */

  connectedCallback() {
    !this.disabled && this.bind();
  }

  disconnectedCallback() {
    this.unbind();
  }

  render() {
    return (
      <slot />
    )
  }
}
