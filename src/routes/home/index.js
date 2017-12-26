import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {
  state = {
    selected: '',
    index: 0,
    entry: 0
  }

  getList(budgets) {
    return budgets.map((item, index) => {
      return (
      <option value={index}>{item.name}</option>
      )
    })
  }

  getSelected = (e) => {
    console.log(e.target.value);
    const selected = this.props.budgets[e.target.value]
    this.setState({ selected: selected });
  }

  updateEntry = (e) => {
    this.setState({ entry: e.target.value })
  }

  componentDidMount() {
    this.setState({ selected: this.props.budgets[0] })
	}

	render({ budgets }, { selected, entry }) {
    const listItems = this.getList(budgets);
    
		return (
			<div class={style.home}>
				<h1>View A Budget</h1>
				<select onChange={this.getSelected.bind(this)}>
          {listItems}
        </select>

        <h2>{selected.name}</h2>
        <div class={style.detailsWrapper}>
          <div class={style.detailItem}>Budgeted: </div>
          <div class={style.detailItem}>${selected.limit}</div>
        </div>
        <div class={style.detailsWrapper}>
          <div class={style.detailItem}>Current: </div>
          <div class={style.detailItem}>${selected.current}</div>
        </div>
        <div class={[style.detailsWrapper, style.currentLine].join(' ')}>
          <div class={style.detailItem}>Update: </div>
          <div class={style.detailItem}>
            <input type="text" onInput={this.updateEntry.bind(this)} />
          </div>
        </div>
        <div class={style.detailsWrapper}>
          <div class={style.detailItem}>Remaining: </div>
          <div class={style.detailItem}>${selected.limit - selected.current - entry}</div>
        </div>
        <div>
          <input type='submit' value='Save' />
        </div>
			</div>
		);
	}
}
