import Button from '../index';
import { defineComponent } from 'vue';

const meta = {
    title: 'Button',
    component: Button,
};

export default meta;

export const BaseButton = () =>
    defineComponent({
        components: { Button },
        compatConfig: { MODE: 3 },
        template: '<Button>SnowDesign</Button>',
    });

export const TypeButton = () =>
    defineComponent({
        components: { Button },
        compatConfig: { MODE: 3 },
        template: `
      <Button>Default</Button>
      <br/><br/>
      <Button type="primary">Primary</Button>
      <br/><br/>
      <Button type="warning">Warning</Button>
      <br/><br/>
      <Button type="danger">Danger</Button>
    `,
    });
