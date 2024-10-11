import { render } from '@testing-library/vue';

export default function mountTest(Component) {
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
