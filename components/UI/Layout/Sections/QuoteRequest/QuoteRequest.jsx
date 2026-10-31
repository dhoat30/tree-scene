import Image from "next/image";
import Container from "@mui/material/Container";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ServiceQuoteForm from "@/components/UI/Forms/ServiceQuoteForm";
import styles from "./QuoteRequest.module.scss";

export default function QuoteRequest({ data }) {
  return (
    <section className={styles.section} data-section="quote-request">
      <Container maxWidth="xl">
        <div className={styles.columns}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Tauranga & surrounding areas</p>
            <h1>{data.title} <span>{data.highlight}</span></h1>
            <p className={styles.lead}>{data.description}</p>
            <div className={styles.benefits}>
              {data.benefits.map((benefit) => (
                <div className={styles.benefit} key={benefit.title}>
                  <span className={styles.check}><CheckRoundedIcon aria-hidden="true" /></span>
                  <div><h2>{benefit.title}</h2><p>{benefit.description}</p></div>
                </div>
              ))}
            </div>
            <div className={styles.proof}>
              <div className={styles.process}>
                <h2>Simple quote process</h2>
                <ol>{data.steps.map((step, index) => <li key={step}><span aria-hidden="true">{index + 1}</span>{step}</li>)}</ol>
              </div>
              <figure className={styles.photo}>
                <Image src={data.image.url} alt={data.image.alt} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 45vw, 25vw" />
                <figcaption>{data.image.caption}</figcaption>
              </figure>
            </div>
          </div>
          <ServiceQuoteForm config={data.form} />
        </div>
      </Container>
    </section>
  );
}
