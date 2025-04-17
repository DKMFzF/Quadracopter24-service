import styles from './constructor-page.module.scss';

// import { BurgerIngredients } from '../../components';
// import { BurgerConstructor } from '../../components';
import { FC } from 'react';

// import { getIngredientState } from '../../services/slices/ingredients-slice/ingredients';

export const ConstructorPage: FC = () => {
  // const isIngredientsLoading = useSelector(getIngredientState).loading;

  return (
    <>
      {(
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            {/* <BurgerIngredients />
            <BurgerConstructor /> */}
          </div>
        </main>
      )}
    </>
  );
};
