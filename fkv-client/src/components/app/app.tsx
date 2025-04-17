import clsx from 'clsx';
import styles from './app.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header';

export const App = () => {
	const location = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

	const backgroundLocation = location.state?.background;

	const closeModal = () => {
    navigate(-1);
  };

	return (
		<div className={clsx(styles.app)}>
			<AppHeader />
		</div>
	);
};

export default App;
