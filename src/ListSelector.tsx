import React from 'react'
import './App.scss'

type Props = {
    options: number[]
    onSelect: (selected: number) => void
}
type State = {
    selected: number
}

export default class ListSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // A selection of -1 will show all lists
        this.state = {
            selected: -1
        }
    }

    onSelect(option: number) {
        this.setState({ selected: option })
        this.props.onSelect(option)
    }

    renderButtons() {
        const buttonList = []
        let className = 'selectorOption'
        if (this.state.selected === -1) {
            className = className.concat(' selected')
        }
        buttonList.push(
            <div onClick={() => this.onSelect(-1)} className={className}> All </div>
        )

        for (const option of this.props.options) {
            className = 'selectorOption'
            if (this.state.selected === option) {
                className = className.concat(' selected')
            }
            buttonList.push(
                <div
                    className={className}
                    onClick={() => this.onSelect(option)}
                >
                    {option}
                </div>
            )
        }
        return buttonList
    }

    render() {
        return (
            <div className='selector'>
                {this.renderButtons()}
            </div>
        )
    }
}