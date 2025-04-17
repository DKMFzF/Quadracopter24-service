import clsx from 'clsx';
import styles from './app.module.scss';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../app-header';
import { HeroPage, Login, NotFound404, Profile, Register } from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import { Modal } from '../modal';
// import { useDispatch } from 'src/services/store';

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

				<Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

				<Route path='*' element={<NotFound404 />} />
			</Routes>

			{/* Модальные окна для отображения поверх основного контента */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                {/* <IngredientDetails /> */}
              </Modal>
            }
          />
        </Routes>
      )}
		</div>
	);
};

export default App;
