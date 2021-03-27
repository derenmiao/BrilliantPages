import { Button, Layout, Menu, Affix,
        Input, Row, Col, Image, Space
} from 'ant-design-vue'
import * as icons from '@ant-design/icons-vue';
// import { createFromIconfontCN } from '@ant-design/icons-vue';

export default (app:any) => {
    app.use(Button)
    app.use(Layout)
    app.use(Menu)
    app.use(Affix)
    app.use(Input)
    app.use(Row)
    app.use(Col)
    app.use(Image)
    app.use(Space)
    
    Object.keys(icons).forEach((key:string) => {
        app.component(key, (icons as any)[key])
    })

}
