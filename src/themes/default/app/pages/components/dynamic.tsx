import styles from '../styles/styles.module.scss';

type Props = {
  pageData: any;
};
export default function DynamicPage({ pageData }: Props) {
  return (
    <article className='container py-10'>
      {pageData.isShowTitle && (
        <h1 className='mb-4 text-center'>{pageData.title}</h1>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: pageData.bodyHtml }}
        className={styles.pageBody}
      ></div>
    </article>
  );
}
