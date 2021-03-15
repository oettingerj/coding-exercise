import React from 'react'
import './App.scss'

type DataItem = {
    id: number,
    listId: number,
    name: string
}
type Props = {
    data: DataItem[],
    showListIds: boolean
}
export default class DataTable extends React.Component<Props> {
    /**
     * Return a list of table row elements
     */
    renderTableData() {
        return this.props.data.map(item => (
            <tr key={item.id} data-testid='dataRow' data-listid={item.listId}>
                {this.props.showListIds ? <td>{item.listId}</td> : null}
                <td>{item.id}</td>
                <td>{item.name}</td>
            </tr>
        ))
    }

    render() {
        return (
            <table className='dataTable'>
                <thead>
                <tr>
                    {this.props.showListIds ? <th>List ID</th> : null}
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {this.renderTableData()}
                </tbody>
            </table>
        )
    }
}