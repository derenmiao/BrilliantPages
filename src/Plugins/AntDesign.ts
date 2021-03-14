import { Button, Layout, Menu, Affix } from 'ant-design-vue'
import * as icons from '@ant-design/icons-vue';

export default (app:any) => {
    app.use(Button)
    app.use(Layout)
    app.use(Menu)
    app.use(Affix)

    Object.keys(icons).forEach((key:any) => {
        app.component(key, icons[key])
    })

}
