import clsx from 'clsx';
import styles from './app.module.scss';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header';
import { HeroPage } from '../../pages';

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

			<Routes location={backgroundLocation || location}>
				<Route path='/' element={<HeroPage />} />
			</Routes>
		</div>
	);
};

export default App;
