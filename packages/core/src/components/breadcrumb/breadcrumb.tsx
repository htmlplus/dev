import { Attributes, Bind, Element, Property, State, Watch, queryAll } from '@htmlplus/element';
import * as Helpers from '@app/helpers';
import * as Constants from './breadcrumb.constants';

/**
 * @part expander  - Expander element.
 * @part item      - Item element.
 * @part separator - Separator element.
 * @slot default   - The default slot.
 * @slot expander  - The expander slot.
 * @slot separator - The separator slot.
 */
@Element()
export class Breadcrumb {
  /**
   * For localization purposes, you can use the provided translations.
   */
  @Property()
  expanderText?: string = 'Show path';

  /**
   * The expander button is displayed when the number of the items reached the maximum limit.
   * The offset property specifies the position of the expander button.
   */
  @Property()
  offset?: number = 1;

  /**
   * Specifies Maximum items that is allowed to be displayed.
   */
  @Property()
  max?: number;

  /**
   * You can use HTML elements, Custom separator, or SVG icon.
   */
  @Property()
  separator?: string;

  @State()
  items?: Array<any>;

  // TODO
  config: any = { slots: {} };

  observer?: MutationObserver;

  get $children() {
    return Array
      .from(Helpers.host(this).children)
      .filter(($node) => !$node.matches(
        [
          Constants.BREADCRUMB_EXPANDER_QUERY,
          Constants.BREADCRUMB_SEPARATOR_QUERY
        ]
        .join(',')
      ));
  }

  @Attributes()
  get attributes() {
    return {
      'aria-label': 'breadcrumb'
    };
  }

  get template() {
    const $node = Helpers.host(this).querySelector(Constants.BREADCRUMB_SEPARATOR_QUERY);

    const $clone = $node?.cloneNode(true) as HTMLElement;

    $clone?.removeAttribute('slot');

    const template = $clone?.outerHTML || this.config.slots.separator || this.separator;

    return template;
  }

  /**
   * Internal Methods
   */

  bind() {
    this.observer = new MutationObserver(this.onChange);
    // TODO
    this.observer.observe(Helpers.host(this), { childList: true });
  }

  unbind() {
    this.observer?.disconnect();
  }

  update(expand?: boolean) {
    
    const $children = this.$children;

    const items = [];

    const { start, length } = (() => {
      if (expand) return {};

      if (typeof this.max !== 'number') return {};

      if ($children.length <= this.max) return {};

      let start, length;

      length = $children.length > this.max ? $children.length - this.max : $children.length;

      const mod = $children.length - length;

      start = this.offset;

      if (start >= 0) {
        start = $children.length < length + start ? mod : start;
      } else {
        start = mod + start + 1;
        start = start < 0 ? 0 : start;
      }

      return { start, length };
    })() as any; // TODO

    $children.forEach(($child, index) => {
      $child.setAttribute('slot', index.toString());

      if (start <= index && index < start + length) return;

      items.push({
        type: 'item',
        key: `${index}`,
        slot: `${index}`
      });
    });

    if (start !== undefined)
      items.splice(start, 0, {
        type: 'expander',
        key: 'expander'
      });

    for (let i = items.length - 1; i > 0; i--)
      items.splice(i, 0, {
        type: 'separator',
        key: `expander-${i}`
      });

    this.items = [...items];
  }

  /**
   * Watchers
   */

  // TODO
  @Watch(['offset', 'max', 'separator'])
  watcher(next, prev, name) {
    switch (name) {
      case 'offset':
      case 'max':
      case 'separator':
        this.update(false);
        // TODO: componentShouldUpdate
        return false;
    }
  }

  /**
   * Events handler
   */

  @Bind()
  onChange() {
    this.update(false);

    // TODO
    // forceUpdate(this);
  }

  /**
   * Lifecycles
   */

  connectedCallback() {
    this.bind();
    this.update(false);
  }

  disconnectedCallback() {
    this.unbind();
  }

  // TODO: it's valid until 'dangerouslySetInnerHTML' doesn't support
  updatedCallback() {
    const template = this.template;
    queryAll(this, '.separator').forEach((element) => (element.innerHTML = template));
  }

  render() {
    return (
      <div class="container">
        {this.items?.map((item) => {
          switch (item.type) {
            case 'item': {
              return (
                <div key={item.key} part="item">
                  <slot name={item.slot} />
                </div>
              );
            }
            case 'expander': {
              return (
                <div
                  aria-disabled="false"
                  aria-label={this.expanderText}
                  class="expander"
                  key={item.key}
                  part="expander"
                  role="button"
                  tabindex="0"
                  onClick={() => this.update(true)}
                  onKeyDown={(event) => event.key.match(/Enter| /) && this.update(true)}
                >
                  <slot name="expander">
                    <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </slot>
                </div>
              );
            }
            case 'separator': {
              return <div key={item.key} aria-hidden="true" class="separator" part="separator" />;
            }
          }
        })}
      </div>
    );
  }
}
