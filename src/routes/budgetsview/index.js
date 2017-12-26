import { h, Component } from 'preact';
import style from './style';
import { Link } from 'preact-router/match';

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

	// Note: `user` comes from the URL, courtesy of our router
	render({  }, { newBudget }) {
		return (
			<div class={style.wrapper}>
				<h1>Budgets</h1>
        <Link href="/newbudget" class={style.newBudgetLink}>Create a new Budget</Link>
			</div>
		);
	}
}
