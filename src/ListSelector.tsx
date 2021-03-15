import React from 'react'
import './App.scss'

type Props = {
    options: number[],
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

    /**
     * Click handler for list numbers
     * @param option - the number that was clicked (-1 if "All" was clicked)
     */
    onSelect(option: number) {
        this.setState({ selected: option })
        this.props.onSelect(option)
    }

    /**
     * Return a list of button elements to render
     */
    renderButtons() {
        const buttonList = []
        let className = 'selectorOption'
        if (this.state.selected === -1) {
            className = className.concat(' selected')
        }
        buttonList.push(
            <button key={-1} onClick={() => this.onSelect(-1)} className={className}> All </button>
        )

        for (const option of this.props.options) {
            className = 'selectorOption'
            if (this.state.selected === option) {
                className = className.concat(' selected')
            }
            buttonList.push(
                <button
                    key={option}
                    className={className}
                    onClick={() => this.onSelect(option)}
                    data-testid='selectorButton'
                    data-listid={option}
                >
                    {option}
                </button>
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