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
    this.setState({ selected: selected, index: e.target.value });
  }

  updateEntry = (e) => {
    this.setState({ entry: e.target.value })
  }

  saveEntry = (e) => {
    const event = new CustomEvent('save-budget-update', {
      detail: {
        budgetName: this.state.selected.name,
        budgetIndex: this.state.index,
        amount: this.state.entry
      }
    });
    document.dispatchEvent(event);
    // Clear entry for calculation
    this.setState({entry: 0});
    document.querySelector('#entry').value = '';
  }

  componentDidMount() {
    this.setState({ selected: this.props.budgets[0] })
	}

	render({ budgets }, { selected, entry }) {
    const listItems = this.getList(budgets);
    
		return (
			<div class={style.home}>
				
        <form action="javascript:void(0);">
          <select class={style.h1} onChange={this.getSelected.bind(this)}>
            {listItems}
          </select>
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
              $<input id='entry' class={style.entry} type="text" onInput={this.updateEntry.bind(this)} />
            </div>
          </div>
          <div class={style.detailsWrapper}>
            <div class={style.detailItem}><strong>Remaining: </strong></div>
            <div class={style.detailItem}><strong>${selected.limit - selected.current - entry}</strong></div>
          </div>
          <div class={style.submit}>
            <input type='submit' value='Save' style="width: 100%" onClick={this.saveEntry.bind(this)}/>
          </div>
        </form>
			</div>
		);
	}
}
