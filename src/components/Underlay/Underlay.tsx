import css from './Underlay.module.scss';

export default () => {
    return (
        <div className={css.container}>
            <div className={css.text}>
                <div className={css.largeText}>WEB DEVELOPMENT</div>
                <div className={css.smallText}>DESIGN - INTERACTIVITY - UI/UX - ANIMATION</div>
            </div>
        </div>
    );
};
