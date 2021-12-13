import { Attributes, Component, Property } from '@htmlplus/compiler/client';
import { SpinnerSize, SpinnerType } from './spinner.types';

/**
 */
@Component()
export class Spinner {

  /**
   * Specifies the size of the spinner.
   */
  @Property({ reflect: true })
  size?: SpinnerSize = 'md';

  /**
   * Specifies which variant of the spinner to use.
   */
  @Property({ reflect: true })
  type?: SpinnerType = 'default';

  @Attributes()
  get attributes() {
    return {
      'role': 'status',
      // TODO 'aria-hidden': true
    }
  }

  get elements() {

    const map = {
      'default': 8,
      'double-bounce': 2
    };

    const number = map[this.type] ?? 1;

    return Array.from(Array(number).keys());
  }

  render() {
    return (
      <div class="wrapper">
        {this.elements.map((element) => <div key={element} />)}
      </div>
    )
  }
}