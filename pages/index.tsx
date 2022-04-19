import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import gekiyaba from '../modules/soshina/gekiyaba'
import { Scene } from '../modules/soshina/types'
import styles from '../styles/Home.module.css'

type Props = {
  seed?: string,
  scenes: Scene[],
  nextSeed: string;
};

export const getServerSideProps: GetServerSideProps<Props, {}, { seed?: string }> = async (context) => {

  const nextSeed = gekiyaba.makeSeed();

  if (!context.query.seed) {
    return {
      props: {
        scenes: [],
        nextSeed
      }
    };
  }

  const seed = Array.isArray(context.query.seed) ? context.query.seed[0] : context.query.seed;
  const salt = process.env.SALT || '0';
  return {
    props: {
      seed,
      scenes: gekiyaba.shuffled(seed, parseInt(salt)),
      nextSeed
    },
  };
}

const Home: NextPage<Props> = ({ seed, scenes, nextSeed }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>粗品激ヤバYouTuberジェネレータ―</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" lang='ja' />
      </Head>
      <div className={styles.main}>
        <h1>粗品激ヤバYouTuberジェネレーター</h1>
        <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ldpGIqDIqgw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={styles.control}>
          <p>
            ランダムな組み合わせの激ヤバYouTuberを生成します
          </p>
          <Link href={`/?seed=${nextSeed}`}>
            <a>ランダム生成</a>
          </Link>
        </div>
        <div className={styles.scenes}>
          {scenes.map((scene, index) => (
            <span className={styles.scene} key={index}>
              <strong>
                {scene.text}
              </strong>
            </span>
          ))}
        </div>
      </div>
      {seed && (
        <div>
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" data-text={`激ヤバYouTuberを生成しました`} className="twitter-share-button" data-show-count="false">Tweet</a>
        </div>
      )}
      <footer className={styles.footer}>
        <div>
          presented by <a href="http://twitter.com/cma2819" target="_blank" rel="noopener noreferrer">Cma</a>
        </div>
      </footer>
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
    </div>
  )
}

export default Home
