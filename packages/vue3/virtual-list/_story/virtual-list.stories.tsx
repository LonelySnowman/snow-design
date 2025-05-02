import VirtualList from '../index';
import { defineComponent, ref } from 'vue';
import { ItemProps } from '@snow-design/foundation/virtual-list/constants';
import Button from '@snow-design/vue3/button';

const meta = {
    title: 'VirtualList',
    component: VirtualList,
    parameters: {
        layout: 'centered',
    },
};

export default meta;

const Row = defineComponent({
    props: ['index', 'style'],
    setup(props: ItemProps) {
        return {
            props,
        };
    },
    template: `
            <div
                :style="{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    backgroundColor: props.index % 2 ? '#f5f5f5' : 'white',
                    boxSizing: 'border-box',
                    borderBottom: '1px solid #e8e8e8',
                    ...props.style,
                }"
            >
                Row {{props.index}}
            </div>
        `,
});

export const FixedHeight = () =>
    defineComponent({
        components: { VirtualList, Row },
        template: `
            <div :style="{ border: '1px solid #e8e8e8', borderRadius: '4px', width: 'max-content' }">
                <VirtualList :height="300" :width="400" :itemSize="50" :itemCount="1000" v-slot="slotProps">
                    <Row :style="slotProps.style" :index="slotProps.index" />
                </VirtualList>
            </div>
        `,
    });

export const VariableHeight = () =>
    defineComponent({
        components: { VirtualList, Row },
        setup() {
            const getItemSize = (index: number) => (index % 3 === 0 ? 80 : 50);

            return { getItemSize };
        },
        template: `
            <div :style="{ border: '1px solid #e8e8e8', borderRadius: '4px', width: 'max-content' }">
                <VirtualList :height="300" :width="400" :itemSize="getItemSize" :itemCount="1000" v-slot="slotProps">
                    <Row :style="slotProps.style" :index="slotProps.index" />
                </VirtualList>
            </div>
        `,
    });

export const VirtualListRefScrollTo = () =>
    defineComponent({
        components: { VirtualList, Row, Button },
        setup() {
            const getItemSize = (index: number) => (index % 3 === 0 ? 80 : 50);
            const containerRef = ref();
            const scrollTo = () => {
                containerRef.value?.scrollTo(25000);
            };
            return {
                containerRef,
                getItemSize,
                scrollTo,
            };
        },
        template: `
                <Button
                    type="primary"
                    @click="scrollTo"
                >
                    Scroll To 25000
                </Button>
                <div :style="{ border: '1px solid #e8e8e8', borderRadius: '4px', width: 'max-content', marginTop: '4px' }">
                    <VirtualList ref="containerRef" :height="300" :width="400" :itemSize="getItemSize" :itemCount="1000" v-slot="slotProps">
                        <Row :style="slotProps.style" :index="slotProps.index" />
                    </VirtualList>
                </div>
            `,
    });
