import React from 'react'
import './App.scss'
import ListSelector from './ListSelector'

type DataItem = {
    id: number,
    listId: number,
    name: string
}
type Props = {}
type State = {
    showListIds: boolean,
    data: DataItem[],
    filteredData: DataItem[]
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showListIds: true,
            data: [],
            filteredData: []
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        let data = await fetch('https://oettingerj.s3.us-east-2.amazonaws.com/hiring.json')
            .then(response => response.json())
        data = this.filterAndSortData(data)
        this.setState({ filteredData: data, data })
    }

    filterAndSortData(data: DataItem[]): DataItem[] {
        const filteredData = data.filter(item => (item.name !== null && item.name !== ""))

        filteredData.sort((item1, item2) => {
            return (item1.listId - item2.listId) || item1.name.localeCompare(item2.name)
        })

        return filteredData
    }

    filterDataByListId(data: DataItem[], listId: number): DataItem[] {
        return data.filter(item => item.listId === listId)
    }

    onSelectList = (option: number) => {
        if (option === -1) {
            this.setState({
                filteredData: this.state.data,
                showListIds: true
            })
        } else {
            const filteredData = this.filterDataByListId(this.state.data, option)
            this.setState({
                showListIds: false,
                filteredData
            })
        }
    }

    renderTableData() {
        return this.state.filteredData.map(item => (
            <tr>
                {this.state.showListIds ? <td>{item.listId}</td> : null}
                <td>{item.id}</td>
                <td>{item.name}</td>
            </tr>
        ))
    }

    render() {
        return (
            <div className='container'>
                <h1>Fetch Data Display</h1>
                <div className='listFilter'>
                    <h4>Filter by list: </h4>
                    <ListSelector options={[1,2,3,4]} onSelect={this.onSelectList}/>
                </div>
                <table className='dataTable'>
                    <thead>
                        <tr>
                            {this.state.showListIds ? <th>List ID</th> : null}
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}
