import { VueElement } from 'vue';
import { render } from '@testing-library/vue';

export default function mountTest(Component: VueElement) {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      const { unmount, rerender } = render(Component);
      expect(() => {
        rerender(Component);
        unmount();
      }).not.toThrow();
    });
  });
}
