import { h, Component } from 'preact';
import style from './style';

export default class BudgetsView extends Component {
	state = {
    newBudget: ''
	};

	// gets called when this route is navigated to
	componentDidMount() {
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
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
  }

	// Note: `user` comes from the URL, courtesy of our router
	render({  }, { newBudget }) {
		return (
			<div class={style.profile}>
				<h1>Budgets</h1>
				<p>Add a new budget</p>
        <form action="javascript:void(0);">
          <input type="text"  placeholder="New Budget" onInput={this.updateNewBudget} />
          <input type="submit" value="Save" onClick={this.save}/>
        </form>
			</div>
		);
	}
}
