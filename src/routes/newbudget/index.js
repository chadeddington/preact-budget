import { h, Component } from 'preact';
import style from './style';

export default class NewBudget extends Component {
  state = {
    newBudget: ''
  };

  // gets called when this route is navigated to
	componentDidMount() {
    console.log('new budget mounted');
	}
  
  updateNewBudget = (e) => {
    this.setState({ newBudget: { name: e.target.value } });
  }

  save = () => {
    console.log('button pressed');
    const newBudget = this.state.newBudget;
    const event = new CustomEvent('add-budget', {
      detail: {
        budget: newBudget
      }
    });
    document.dispatchEvent(event);
    document.querySelector('#newBudgetName').value = '';
  }

  render() {
    return (
      <div class={style.wrapper}>
        <form action="javascript:void(0);">
          <h1>Add a new budget</h1>
          <div class={style.formLayout}>
            <label>Budget Name: </label>
            <input id="newBudgetName" type="text"  placeholder="New Budget" onInput={this.updateNewBudget} />
          </div>
          <div class={style.formLayout}>
            <label>Budget Limit: </label>
            <input id="newBudgetLimit" type="number" placeholder="0" />
          </div>
          <div>
            <input type="submit" value="Save" style="width: 100%" onClick={this.save}/>
          </div>
        </form>
      </div>
    )
  }
}