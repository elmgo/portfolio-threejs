import css from './Underlay.module.scss';

export default () => {
    return (
        <div className={css.container}>
            <div className={css.text}>
                <div className={css.largeText}>
                    <div className={css.inner}>WEB DEVELOPMENT</div>
                </div>
                <div className={css.smallText}>
                    <div className={css.inner}>DESIGN - UI/UX - INTERACTIVITY - ANIMATION</div>
                </div>
            </div>
        </div>
    );
};
