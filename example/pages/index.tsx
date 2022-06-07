import type { NextPage } from 'next';
import Image from 'next/image';
import UploadcareImage, { uploadcareLoader } from '@uploadcare/nextjs-loader';
import { FC } from 'react';
import styles from '../styles/Home.module.css';

type CodeProps = {
  [key: string]: any;
};
const Code: FC<CodeProps> = (p) => (
  <code className={styles.inlineCode} {...p} />
);

const Home: NextPage = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      <h1>
        Uploadcare custom loader for Image Component{' '}
        <a href="https://github.com/uploadcare/nextjs-loader">
          @uploadcare/nextjs-loader
        </a>
      </h1>
      <p>
        The following is an example of a reference to an image from the{' '}
        Uploadcare CDN at <Code>ucarecdn.com</Code>
      </p>
      <p>
        It will be served directly from <Code>ucarecdn.com</Code>, without
        proxying through Media Proxy.
      </p>
      <Image
        loader={uploadcareLoader}
        alt="Vercel logo"
        src="https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/vercel.png"
        width={1000}
        height={1000}
      />
      <hr className={styles.hr} />
      <p>
        The following is an example of use of the <Code>UploadcareImage</Code>{' '}
        helper component.
      </p>
      <UploadcareImage
        alt="Vercel logo"
        src="https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/vercel.png"
        width={500}
        height={500}
      />
      <hr className={styles.hr} />
      <p>
        The following is an example of use of the <Code>UploadcareImage</Code>{' '}
        helper component with <Code>placeholder=blur</Code> property. It&apos;s
        better to enable network throttling in dev tools to see the blurred placeholder.
      </p>
      <UploadcareImage
        alt="Vercel logo"
        src="https://ucarecdn.com/c768f1c2-891a-4f54-8e1e-7242df218b51/pinewatt2Hzmz15wGikunsplash.jpg"
        width={500}
        height={500}
        placeholder="blur"
      />
      <hr className={styles.hr} />
      <p>
        The following is an example of a reference to an external image at{' '}
        <Code>assets.vercel.com</Code>.
      </p>
      <p>It will be proxied through Media Proxy.</p>
      <Image
        alt="Next.js logo"
        src="https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js.png"
        width={1200}
        height={400}
        loader={uploadcareLoader}
      />
      <hr className={styles.hr} />
      <p>SVGs and GIFs will be used without transformations</p>
      <Image
        alt="Next.js logo"
        src="https://ucarecdn.com/375bba4b-35db-4cb8-8fc7-7540625f2181/next.svg"
        width={64}
        height={64}
        loader={uploadcareLoader}
      />
      <Image
        alt="Vercel logo"
        src="https://ucarecdn.com/0f23a269-13eb-4fc9-b378-86f224380d26/vercel.gif"
        width={64}
        height={64}
        loader={uploadcareLoader}
      />
      <hr className={styles.hr} />
      <p>
        Local image will be served AS IS in Development, and converted to the
        absolute URL and passed to the proxy in Production
      </p>
      <Image
        alt="A local image"
        src="/local_image.png"
        width={494}
        height={332}
        loader={uploadcareLoader}
      />
      <hr className={styles.hr} />
      Checkout the project documentation on Github{' '}
      <a href="https://github.com/uploadcare/nextjs-loader">
        @uploadcare/nextjs-loader
      </a>
      .
    </div>
  </div>
);

export default Home;
