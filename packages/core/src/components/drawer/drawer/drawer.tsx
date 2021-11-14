import { Component, ComponentInterface, Host, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { Animation, Bind, ClickOutside, GlobalConfig, Helper, IsRTL, Media, Scrollbar } from '@app/utils';
import { Action, Observable, reconnect } from './drawer.link';
import { DrawerBackdrop, DrawerBreakpoint, DrawerPlacement, DrawerPlatform, DrawerTemporary } from './drawer.types';

/**
 * @group drawer
 * @slot default - The default slot.
 */
@Component({
  tag: 'plus-drawer',
  styleUrl: 'drawer.scss',
  shadow: true,
})
export class Drawer implements ComponentInterface {

  /**
   * TODO
   */
  @Prop({ reflect: true })
  animation?: string;

  /**
   * Activate the drawer's backdrop to show or not.
   */
  @Prop()
  backdrop?: DrawerBackdrop = 'auto';

  /**
   * Sets the mobile breakpoint to apply alternate styles for mobile devices 
   * when the breakpoint value is met.
   */
  @Prop()
  breakpoint?: DrawerBreakpoint = 'md';

  /**
   * This property helps you to attach which drawer toggler controls the drawer. 
   * It doesn't matter where the drawer toggler is. 
   * You can put the drawer's toggler inside or outside of the drawer. 
   * Read more about connectors [here](https://htmlplus.io/features/connector).
   */
  @Prop()
  connector?: string;

  /**
   * Set the width of drawer to the minimum size you specified for the `mini-size` property.
   */
  @Prop({ reflect: true })
  mini?: boolean;

  /**
   * Sets the minimum width size of the drawer.
   */
  @Prop()
  miniSize?: string;

  /**
   * Control drawer to show or not.
   */
  @Prop({
    mutable: true,
    reflect: true,
  })
  open?: boolean;

  /**
   * If true, don't allow the drawer to be closed by clicking outside of the drawer. 
   * If false, the drawer will be closed by clicking outside of it.
   */
  @Prop()
  persistent?: boolean;

  /**
   * Specifies where the drawer will open.
   */
  @Prop()
  placement?: DrawerPlacement;

  /**
   * It controls the flexibility of the drawer's width. If yes, the width of the drawer can be reduced. 
   * If false doesn't allow the width of the drawer to reduce. 
   */
  @Prop()
  flexible?: boolean;

  /**
   * Determine the width of the drawer.
   */
  @Prop()
  size?: string;

  /**
   * On default the drawer is considered as a part of the main container. 
   * it pushes the other contents on opening. 
   * If true it will be opened over other contents and doesn't affect other contents. 
   * A temporary drawer sits above its application and uses a backdrop to darken the background. 
   */
  @Prop()
  temporary?: DrawerTemporary;

  /**
   * When the drawer is going to hide
   */
  @Event({
    bubbles: false,
    cancelable: true,
  })
  plusClose!: EventEmitter<void>;

  /**
   * When the drawer is completely closed and its animation is completed.
   */
  @Event({
    bubbles: false,
    cancelable: false,
  })
  plusClosed!: EventEmitter<void>;

  /**
   * When the drawer is going to show this event triggers
   */
  @Event({
    bubbles: false,
    cancelable: true,
  })
  plusOpen!: EventEmitter<void>;

  /**
   * When the drawer is completely shown and its animation is completed.
   */
  @Event({
    bubbles: false,
    cancelable: false,
  })
  plusOpened!: EventEmitter<void>;

  @GlobalConfig('drawer', {
    backdrop: 'auto',
    breakpoint: 'md'
  })
  config?;

  @IsRTL()
  isRTL?: boolean;

  @State()
  platform?: DrawerPlatform;

  @Element()
  $host!: HTMLElement;

  $root!: HTMLElement;

  animations: { open?: Animation, mini?: Animation } = {};

  isOpen?: boolean;

  @Observable()
  tunnel?: boolean;

  get attributes() {
    return {
      platform: this.platform,
      style: this.styles,
    }
  }

  get classes() {

    const placement = Helper.toAxis(this.placement || 'start', this.isRTL);

    return Helper.classes(
      'root',
      {
        [placement]: true,
        reverse: this.flexible
      }
    )
  }

  get hasBackdrop() {

    if (!this.isTemporary) return false;

    if (Helper.toBoolean(this.backdrop)) return true;

    if (this.backdrop === 'auto') return true;

    return false;
  }

  get isTemporary() {

    if (Helper.toBoolean(this.temporary)) return true;

    if (this.temporary === 'on-breakpoint' && this.platform === 'mobile') return true;

    return false;
  }

  get styles() {
    return {
      '--plus-drawer-size': this.size ?? null,
      '--plus-drawer-mini-size': this.miniSize ?? null,
    }
  }

  /**
   * Methods
   */

  hide() {
    this.tryHide(true, false);
  }

  show() {
    this.tryShow(true, false);
  }

  @Action()
  toggle() {
    this.isOpen ? this.hide() : this.show();
  }

  /**
   * Internal Methods
   */

  broadcast(value) {
    this.tunnel = value;
  }

  initialize() {

    this.animations.open = new Animation({
      key: 'state',
      source: () => this.$host,
      target: () => this.$host,
      state: this.open ? 'entered' : 'leaved',
      states: {
        enter: 'open',
        entering: 'opening',
        entered: 'opened',
        leave: 'close',
        leaving: 'closing',
        leaved: 'closed',
      }
    })

    this.animations.mini = new Animation({
      key: 'mini-state',
      source: () => this.$host,
      target: () => this.$host,
      state: this.mini ? 'entered' : 'leaved',
      states: {
        enter: 'enter',
        entering: 'entering',
        entered: 'entered',
        leave: 'leave',
        leaving: 'leaving',
        leaved: 'leaved',
      }
    })

    if (!this.open) return;

    this.tryShow(false, true);
  }

  terminate() {
    this.animations.open?.dispose();
    this.animations.mini?.dispose();
  }

  tryHide(animation, silent) {

    if (!this.isOpen) return;

    if (!silent && this.plusClose.emit().defaultPrevented) return;

    if (!animation) return this.onHide();

    this.animations.open?.leave({
      onLeave: () => {

        // TODO: experimantal new link
        this.broadcast(false);
      },
      onLeaved: () => {

        this.onHide();

        if (silent) return;

        this.plusClosed.emit()
      }
    })
  }

  tryShow(animation, silent) {

    if (this.isOpen) return;

    if (!silent && this.plusOpen.emit().defaultPrevented) return;

    if (!animation) return this.onShow();

    this.animations.open?.enter({
      onEnter: () => {
        this.onShow();
      },
      onEntered: () => {

        if (silent) return;

        this.plusOpened.emit();
      }
    })
  }

  /**
   * Watchers
   */

  componentShouldUpdate(next, prev, name) {

    if (next === prev) return false;

    const value = this[name];

    switch (name) {

      case 'connector':

        reconnect(this);

        break;

      case 'mini':

        value && this.animations.mini?.enter();

        !value && this.animations.mini?.leave();

        break;

      case 'open':

        value && !this.isOpen && this.tryShow(true, true);

        !value && this.isOpen && this.tryHide(true, true);

        break;
    }
  }

  /**
   * Events handler
   */

  onHide() {

    // reset document's scroll
    Scrollbar.reset(this);

    // remove outside click listener
    ClickOutside.remove(this.$root);

    // update state
    this.open = this.isOpen = false;

    // TODO: experimantal new link
    this.broadcast(false);
  }

  onShow() {

    // remove document's scroll
    this.isTemporary && Scrollbar.remove(this);

    // remove outside click listener
    ClickOutside.add(this.$root, this.onClickOutside, false);

    // update state
    this.open = this.isOpen = true;

    // TODO: experimantal new link
    this.broadcast(true);
  }

  @Bind
  @Media('[breakpoint]-down')
  onMedia(event) {

    this.platform = event.matches ? 'mobile' : 'desktop';

    if (!event.matches && this.open) this.open = false;
  }

  @Bind
  onClickOutside() {

    if (!this.isOpen || !this.isTemporary || this.persistent) return;

    this.tryHide(true, false);
  }

  /**
   * Lifecycles
   */

  connectedCallback() {
    this.initialize();
  }

  disconnectedCallback() {
    this.terminate();
  }

  render() {
    return (
      <Host {...this.attributes}>
        {this.hasBackdrop && (<div class="backdrop" part="backdrop"><div /></div>)}
        <div
          class={this.classes}
          ref={($element) => this.$root = $element}
        >
          <slot />
        </div>
      </Host>
    )
  }
}
