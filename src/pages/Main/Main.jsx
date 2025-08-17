import React from 'react'
import classes from './Main.module.css'
import baner1 from '../../assets/baner 1.jpg'
import baner2 from '../../assets/baner 2.jpg'
import baner3 from '../../assets/baner 3.jpg'

function Main() {
  return (
    <div className={classes.main}>
        <section className={classes.hero}>
            <div className={classes.hero_back}>
                <img src={baner1} alt="" className={classes.hero_back_img} />
                <div className={classes.hero_overlay}></div>
            </div>
            <div className={classes.hero_body}>
                <h1 className={classes.hero_body_h1}>Перегляд фільмів та серіалів</h1>
                <p className={classes.hero_body_text}>Дивіться ексклюзивний контент <b>STREAMIX</b> а також інші популярні фільми та серіали</p>
                <button className={classes.hero_body_button}>Почати пробний період</button>
            </div>
        </section>

        <section className={classes.selling}>
            <div className={classes.selling_imageWrapper}>
                <img className={classes.selling_img} src={baner2} alt="" />
                <div className={classes.selling_overlay}></div>
            </div>
            <div className={classes.selling_body}>
                <h2 className={classes.selling_title}>Дивіться зараз з можливістю скасувати підписку в будь - який час</h2>
                <p className={classes.selling_text}>реєструйся без ризику. підписку streamix можна скасувати в будь-який час.</p>
                <button className={classes.selling_button}>Оформити підписку</button>
            </div>
        </section>

        <section className={classes.selling}>
            <div className={classes.selling_imageWrapper}>
                <img className={classes.selling_img} src={baner3} alt="" />
                <div className={classes.selling_overlay}></div>
            </div>
            <div className={classes.selling_body}>
                <h2 className={classes.selling_title}>підписка “Максимальна”</h2>
                <div>
                    <div className={classes.selling_text}>10 000 фільмів</div>
                    <div className={classes.selling_text}>10 000 серіалів</div>
                </div>
                <button className={classes.selling_button}>Спробувати за 99 грн.</button>
            </div>
        </section>

        <div className={classes.section_border}></div>

        <section className={classes.section_info}>
            <h3 className={classes.section_info_title}>Дивитися фільми онлайн</h3>
            <p className={classes.section_info_text}>Чим себе зайняти після важких трудових буднів? Повсякденне життя пропонує масу варіантів, але практично кожна людина на нашій планеті любить 
            переглядати улюблені кінокартини, тим паче з українським озвученням. Ми створили зручний і унікальний у своєму роді кінотеатр для перегляду кіно
            онлайн українською в комфортних для тебе умовах. Тобі більше ніколи не доведеться шукати якусь вільну хвилинку, щоб знайти підходящі кінотеатри,
            встигнути купити в касі або забронювати через інтернет квитки на улюблені місця. Все це залишилося позаду, а взамін великі перспективи дивитися
            фільми онлайн в хорошій HD якості українською мовою на нашому сайті. Дорогий гість ресурсу, пропонуємо тобі прямо зараз зануритися в неймовірно
            захоплюючий світ - новинки кінопрокату онлайн українською мовою доступні всім користувачам цілодобово!</p>
            
            <h3 className={classes.section_info_title}>Серіали онлайн</h3>
            <p className={classes.section_info_text}>Що ж стосується запропонованого списку фільмів і серіалів, які ти можеш тут дивитися в HD якості, то він постійно розширюється і доповнюється картинами
            найпопулярніших хітів Голлівуду і, звичайно ж, України. Словом, кожен шанувальник високоякісного світового кінематографа обов'язково знайде на нашому
            сайті те, що йому принесе море задоволення від перегляду онлайн і з українським дубляжем в домашніх умовах! Клич друзів, і ти чудово проведеш час разом 
            з близькими і рідними людьми - наш ресурс стане прекрасним акомпанементом для твого розслабленого і веселого відпочинку!</p>

            <h3 className={classes.section_info_title}>Дивіться фільми, мультфільми та серіали на iPhone, iPad і Android онлайн</h3>
            <p className={classes.section_info_text}>Наш портал надає можливість переглядати Ваші улюблені стрічки у найкращій якості прямо з мобільного, чи планшета. Більше нема потреби чекати нагоди 
            сісти за комп'ютер для перегляду кіно. Тепер Ви можете робити це будь-де, де є підключення до інтернету і ваш смартфон чи планшет. Пропонуємо Вам почати 
            перегляд з ваших гаджетів уже зараз у HD якості. Ми потурбувалися про зручність перегляду, та постійно робимо наш портал кращим, 
            щоб ви отримували лише найкращі емоції та стовідсоткове задоволення від перегляду.</p>
        </section>
    </div>
  )
}

export default Main