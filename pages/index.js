import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import client from '../services/contentfulClient';

const currentEvents = [
  'Currently building Pigeon 🐦',
  'Currently studying at UPenn 🏫',
  'Currently sourcing projects at Hack4Impact 🌍',
  'Currently thinking about dinner 🍕',
];

export default function Home() {
  const [currentEvent, setCurrentEvent] = useState(currentEvents[0]);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const { items } = await client.getEntries();
      setPosts(items);
      console.log(items);
    } catch (err) {
      console.error(err);
    }
  }

  function handleProfileClick() {
    const profileNum = 3;
    setCurrentProfile((currentProfile + 1) % profileNum);
  }

  useEffect(() => {
    let pointer = 0;
    const len = currentEvents.length;

    fetchPosts();

    setInterval(() => {
      pointer = (pointer + 1) % len;
      setCurrentEvent(currentEvents[pointer]);
    }, 2500);
  }, []);

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
          <p className={styles.paragraph} style={{ padding: '0px 30px' }}>
            More about me: I'm studying CS + Marketing at UPenn's M&T Program.
            Originally from Hong Kong, I have since lived in Shanghai, Boston,
            and now Philadelphia. I'm a practical idealist, and I care about
            furthering environmental sustainability and social equity through
            media, film, and tech.
          </p>

          <h2 className={styles.subtitle1} style={{ padding: '0px 30px' }}>
            Moonshot Projects
          </h2>
        </div>
        <div className={styles.grid}>
          {posts.length > 0 &&
            posts.map((res) => (
              <a href="#" className={styles.card} key={res.sys.id}>
                <img src={res.fields.featuredImage.fields.file.url} />
                <div className={styles.textContainer}>
                  <h3>{res.fields.title}</h3>
                  <p>{res.fields.shortDescription}</p>
                </div>
              </a>
            ))}
        </div>
      </main>

      <footer className={styles.footer}>Made with ❤️ by DT</footer>
    </div>
  );
}
