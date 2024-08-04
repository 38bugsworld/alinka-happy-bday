import { useEffect, useRef, useState } from "react";
import cn from "classnames";

import bg from "./assets/bg.jpg";
import loveLetterImg from "./assets/love-letter.png";
import cakeImg from "./assets/cake.png";
import cake2Img from "./assets/cake-2.png";
import cake3Img from "./assets/cake-3.png";
import meImg from "./assets/me.jpg";
import youImg from "./assets/you.jpg";
import heartImg from "./assets/heart.png";
import zazuImg from "./assets/zazu.jpg";
import bunnyImg from "./assets/bunny.jpg";
import catsImg from "./assets/cats.png";
import bannerImg from "./assets/banner.png";
import paperOpenMp3 from './assets/paper.mp3';
import paperCloseMp3 from './assets/paper-hide.mp3';
import candleBlowMp3 from './assets/candle-blow.mp3';
import happyBirthdayMp3 from './assets/happy-birthday.mp3';
import eatCakeMp3 from './assets/eat-cake.mp3';

import useOnClickOutside from "./hooks/useOnClickOutside";
import styles from "./App.module.scss";

import { Howl } from "howler";
import classNames from "classnames";

const paperOpenSound = new Howl({
  src: [paperOpenMp3],
});

const paperHideSound = new Howl({
  src: [paperCloseMp3],
});

const candleSound = new Howl({
  src: [candleBlowMp3],
});

const happyBirthdayMusic = new Howl({
  src: [happyBirthdayMp3],
  volume: 0.5,
});

const eatCakeSound = new Howl({
  src: [eatCakeMp3],
  volume: 1.5,
});

const isMobileDevice = () => {
  return /Mobi|Android|IOS|iPad|iPhone/i.test(navigator.userAgent);
};

function App() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isLetterRead, setIsLetterRead] = useState(false);
  const [isCakeClicked, setIsCakeClicked] = useState(false);
  const [isZazuVisible, setIsZazuVisible] = useState(false);
  const [isBunnyVisible, setIsBunnyVisible] = useState(false);
  const [isCakeBitted, setIsCakeBitted] = useState(false);

  const paperRef = useRef(null);

  useOnClickOutside(paperRef, () => {
    if (isLetterOpen) {
      setIsLetterOpen(false);
      paperHideSound.play();
      happyBirthdayMusic.play();
    }
  });

  const handleLetterOpen = () => {
    setIsLetterOpen(true);
    paperOpenSound.play();

    setTimeout(() => {
      setIsLetterRead(true);
    }, 500)
  };

  const handleCakeClick = () => {
    if (!isCakeClicked) {
      setIsCakeClicked(true);
      candleSound.play();
    }

    if (isCakeClicked && !isCakeBitted) {
      setIsCakeBitted(true);
      eatCakeSound.play();
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        if (isLetterOpen) {
          setIsLetterOpen(false);
          paperHideSound.play();
          happyBirthdayMusic.play();
        }
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isLetterOpen]);

  if (isMobileDevice()) {
    return (
      <main className={styles.container}>
        <img className={styles.bg} src={bg} />
        <p
          style={{
            position: "fixed",
            fontSize: 100,
            width: "100%",
            textAlign: "center",
          }}
        >
          шуруй на десктоп🫣
        </p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <img className={styles.bg} src={bg} />

      {!isLetterRead && (
        <img
          className={styles.loveLetter}
          src={loveLetterImg}
          onClick={handleLetterOpen}
        />
      )}
      <img
        src={bannerImg}
        className={cn(styles.banner, {
          [styles.active]: isLetterRead && !isLetterOpen,
        })}
      />
      <img
        src={catsImg}
        className={cn(styles.cats, {
          [styles.active]: isLetterRead && !isLetterOpen,
        })}
      />
      <img
        className={classNames(styles.cake, {
          [styles.active]: isLetterRead && !isLetterOpen,
          [styles.bitted]: isCakeBitted,
        })}
        src={isCakeClicked ? (isCakeBitted ? cake3Img : cake2Img) : cakeImg}
        onClick={handleCakeClick}
      />

      <div
        className={cn(styles.paperContainer, {
          [styles.open]: isLetterOpen,
        })}
        ref={paperRef}
      >
        <div className={styles.paper}>
          <p className={styles.paper__text}>
            привіт, моя любіма дєвочка !!!!!
            <br />
            <br />
            сьогодні твій день і я дуже радий що можу тебе з ним привітати. за
            час нашого спілкування ти стала для мене дуже близькою і дуже рідною
            людинкою, я хочу щоб ти в черговий раз знала що я дуже ціную всі
            моменти проведені разом з тобою. я часто задумуюсь, що не знаю що
            би я робив, зникни ти вдруг з мого життя.
            <br />
            <br />
            ти безмежно багато значиш для мене
            <br />
            з днем народження тебе, алінка 💘
            <br />
            <br />
            <span>
              p.s. тут є пасхалочка хихихихи

            </span>
            <br />
            <span>
              p.s.s. шоб закрити лист клікни за межами паперу

            </span>
          </p>
          <div className={styles.lovePicContainer}>
            <div className={styles.lovePic}>
              <img
                className={styles.alina}
                src={isZazuVisible ? zazuImg : youImg}
                onClick={() => setIsZazuVisible(true)}
              />
              <img
                src={isBunnyVisible ? bunnyImg : meImg}
                onClick={() => setIsBunnyVisible(true)}
              />
              {isZazuVisible && isBunnyVisible && (
                <img className={styles.heart} src={heartImg} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
