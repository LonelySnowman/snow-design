import Button from '../index';
import { defineComponent } from "vue";
import React from "react";

const meta = {
    title: 'Example/Button',
    component: Button,
}

export default meta;

export const BaseButton = () => defineComponent({
    components: { Button },
    compatConfig: { MODE: 3 },
    setup(props: any) {
        return () => <>
            <Button>SnowDesign</Button>
        </>
    }
});

export const TypeButton = () => defineComponent({
    components: { Button },
    compatConfig: { MODE: 3 },
    setup() {
        return () => <>
            <Button>Default</Button>
            <br/><br/>
            <Button type="primary">Primary</Button>
            <br/><br/>
            <Button type="warning">Warning</Button>
            <br/><br/>
            <Button type="danger">Danger</Button>
        </>
    }
});
