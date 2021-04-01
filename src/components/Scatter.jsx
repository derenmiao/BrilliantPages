import { defineComponent } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { aliIconPath } from '@/Config/params.config'

/**
 * iconFont
 */
const AliIconFont = createFromIconfontCN({
    scriptUrl: aliIconPath,
});
export const IconFont = defineComponent({
    components: { AliIconFont },
    props: ['type'],
    setup(props) {
        return () => <a>nihao</a>
    }
})