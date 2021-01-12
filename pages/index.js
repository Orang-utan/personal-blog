import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import client from '../services/contentfulClient';

const currentEvents = [
  'Currently building <a href="https://lunchable.netlify.app" target="_blank">Lunchable</a> 🌯',
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
    } catch (err) {}
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
      <script
        defer
        src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
      ></script>

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
            <strong>Let's Connect:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/daniel-y-tian/"
              target="_blank"
            >
              LinkedIn
            </a>{' '}
            |{' '}
            <a href="https://github.com/orang-utan" target="_blank">
              Github
            </a>{' '}
            |{' '}
            <a href="https://twitter.com/dtjourney" target="_blank">
              Twitter
            </a>
          </p>
          <p className={styles.paragraph} style={{ padding: '0px 30px' }}>
            <strong>More about me:</strong> I'm studying CS / Entrepreneurship
            at UPenn's M&T Program. Originally from Hong Kong, I have since
            lived in Shanghai, Boston, and now Philadelphia. I'm a practical
            idealist, and I care about building products to help everyone adapt
            and benefit from an increasingly automated world.
          </p>
          <p className={styles.paragraph} style={{ padding: '0px 30px' }}>
            I'm a full stack engineer. My technical interest lies in distributed
            systems and making access to computation "
            <a
              href="https://www.wired.com/story/what-mongolian-nomads-teach-us-about-the-digital-future/"
              target="_blank"
            >
              nomadic
            </a>
            ".
          </p>

          <h2 className={styles.subtitle1} style={{ padding: '0px 30px' }}>
            Moonshot Projects
          </h2>
        </div>
        <div className={styles.grid}>
          {posts.length > 0 &&
            posts.map((res) => (
              <a
                href={res.fields.url}
                className={styles.card}
                key={res.sys.id}
                target="_blank"
              >
                <img src={res.fields.featuredImage.fields.file.url} />
                <div className={styles.textContainer}>
                  <h3>{res.fields.title}</h3>
                  <p>{res.fields.shortDescription}</p>
                </div>
              </a>
            ))}
        </div>
      </main>

      <footer className={styles.footer}>
        Made with
        <i
          className="fas fa-heart"
          style={{
            color: '#e74c3c',
            height: '20px',
            width: '20px',
            margin: '0px 5px',
          }}
        />
        by DT
      </footer>
    </div>
  );
}
