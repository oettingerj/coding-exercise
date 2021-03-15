import React from 'react'
import './App.scss'
import ListSelector from './ListSelector'
import DataTable from './DataTable'

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

    /**
     * Called when the App component is mounted; this is when we fetch data from the server
     */
    async componentDidMount() {
        await this.fetchData().catch(error => {
            console.error(error)
            alert('An error occurred when fetching data from the server.')
        })
    }

    /**
     * Fetch the json file from the server and process it
     */
    async fetchData() {
        let data = await fetch('https://oettingerj.s3.us-east-2.amazonaws.com/hiring.json')
            .then(response => response.json())
        data = this.filterAndSortData(data)
        this.setState({ filteredData: data, data })
    }

    /**
     * Filter out null/empty names and sort by listId then name
     * @param data
     * @return the filtered/sorted list
     */
    filterAndSortData(data: DataItem[]): DataItem[] {
        const filteredData = data.filter(item => (item.name !== null && item.name !== ""))

        filteredData.sort((item1, item2) => {
            return (item1.listId - item2.listId) || item1.name.localeCompare(item2.name)
        })

        return filteredData
    }

    /**
     * Filter data by list id
     * @param data
     * @param listId
     * @return the filtered list
     */
    filterDataByListId(data: DataItem[], listId: number): DataItem[] {
        return data.filter(item => item.listId === listId)
    }

    /**
     * Handler for list filter selection
     * @param option
     */
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

    render() {
        return (
            <div className='container'>
                <h1>Fetch Data Display</h1>
                <div className='listFilter'>
                    <h4>Filter by list: </h4>
                    <ListSelector options={[1,2,3,4]} onSelect={this.onSelectList} />
                </div>
                <DataTable data={this.state.filteredData} showListIds={this.state.showListIds} />
            </div>
        )
    }
}
