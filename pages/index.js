import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const currentEvents = [
  'Currently building Pigeon 🐦',
  'Currently studying at UPenn 🏫',
  'Currently sourcing project at Hack4Impact 🌍',
  'Currently thinking about dinner 🍕',
];

export default function Home() {
  const [currentEvent, setCurrentEvent] = useState(currentEvents[0]);
  const [currentProfile, setCurrentProfile] = useState(0);

  useEffect(() => {
    let pointer = 0;
    const len = currentEvents.length;

    setInterval(() => {
      pointer = (pointer + 1) % len;
      setCurrentEvent(currentEvents[pointer]);
    }, 2500);
  }, []);

  function handleProfileClick() {
    const profileNum = 3;
    setCurrentProfile((currentProfile + 1) % profileNum);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Daniel Tian</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <img
            src={`/images/profile${currentProfile}.png`}
            className={styles.profile}
            onClick={handleProfileClick}
          />
          <div>
            <h1 className={styles.title}>Hey! I'm Daniel</h1>
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: currentEvent }}
            ></p>
          </div>
        </div>

        <div className={styles.bodyContainer}>
          <p className={styles.paragraph}>
            More about me: I'm studying CS + Marketing at UPenn's M&T Program.
            Originally from Hong Kong, I have since lived in Shanghai, Boston,
            and now Philadelphia. I'm a practical idealist, and I care about
            furthering environmental sustainability and social equity through
            media, film, and tech.
          </p>
        </div>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>Made with ❤️ by DT</footer>
    </div>
  );
}
