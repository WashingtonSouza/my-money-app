import React, {Component} from 'react'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'

class BillingCycle extends Component {
    render() {
        return (
            <div>
                <ContentHeader title='Cliclos de Pagamentos' small='Cadastro' />
                <Content>
                    Ciclo de Pagamento
                </Content>
            </div>
        )
    }
}

export default BillingCycle