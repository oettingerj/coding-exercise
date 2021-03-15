import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import DataTable from './DataTable'

// Test that all data rows fetched from the server are displayed
test('table displays data correctly', async () => {
    const data = await fetch('https://oettingerj.s3.us-east-2.amazonaws.com/hiring.json')
        .then(response => response.json())
    render(<DataTable data={data} showListIds={true}/>)
    const tableRows = await screen.queryAllByTestId('dataRow')
    expect(tableRows.length).toBe(data.length)
})

// Test that filtering by list removes all data from other lists
test('list selector filters list correctly', async () => {
    render(<App/>)
    const buttons = await screen.findAllByTestId('selectorButton')
    const button = buttons[0]
    const listId = button.getAttribute('data-listid')
    fireEvent.click(button)
    const tableRows = await screen.queryAllByTestId('dataRow')
    const listIds = tableRows.map(row => row.getAttribute('data-listid'))
    expect(listIds.filter(id => id !== listId).length).toBe(0)
})