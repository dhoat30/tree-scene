import Image from "next/image";
import Link from "next/link";
import TreeRemovalQuoteForm from "./TreeRemovalQuoteForm";
import styles from "./TreeRemovalQuotePage.module.css";

const craneImage =
  "https://cms.treescene.co.nz/wp-content/uploads/2026/02/down-net_http20260217-271-a7btzg-1-scaled.jpg";
const arboristImage =
  "https://cms.treescene.co.nz/wp-content/uploads/2025/03/IMG_9145-scaled.jpg";

const trustPoints = [
  "Locally owned",
  "$2 million insured",
  "100% satisfaction commitment",
  "Certified arborists",
  "Free site visit",
];

const treeTypes = [
  ["Palm trees", "Phoenix, Queen, Washingtonia, Bangalow & more"],
  ["Yucca trees", "Tall, multi-stemmed and hard-to-access yuccas"],
  ["Gum trees", "Eucalyptus and other large spreading gums"],
  ["Pine trees", "Norfolk, radiata and other mature pines"],
  ["Macrocarpa & cypress", "Large boundary trees and shelterbelts"],
  ["Wattle & privet", "Fast-growing and invasive problem trees"],
  ["Poplar & liquidambar", "Tall deciduous trees near homes"],
  ["Native trees", "Pōhutukawa, cabbage trees and others where permitted"],
];

const reviews = [
  {
    text: "The service was outstanding. Four large 20m Washingtonia palms were removed quickly and the property was left very tidy.",
    name: "Colin Davis",
  },
  {
    text: "Great communication and prompt service. Large tree in back yard topped, cleaned up perfectly, all done efficiently. Highly recommend 👌",
    name: "Sonya Skerten",
  },
  {
    text: "The guys came and took 2 palms out and trimmed 2 more. Great to deal with and left a good clean and tidy job and prompt service.",
    name: "Bruce Hemingway",
  },
];

function CheckIcon({ dark = false }) {
  return (
    <svg
      className={dark ? styles.checkDark : styles.check}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function Stars() {
  return (
    <span className={styles.stars} aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}

export default function TreeRemovalQuotePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" aria-label="Tree Scene Tauranga home">
            <Image
              src="/logo.png"
              width={147}
              height={49}
              alt="Tree Scene Tauranga"
              priority
            />
          </Link>
          <div className={styles.headerContact}>
            <span>Talk to a local arborist</span>
            <a href="tel:+64212420305">021 242 0305</a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>Tauranga tree removal specialists</div>
            <h1>
              Tree Removal Tauranga <em>Quotes</em>
            </h1>
            <p className={styles.heroLead}>
              From palms to big, complex trees, our certified arborists use
              specialist crane equipment to remove trees safely, quickly and
              with less impact on your lawn, home and landscaping.
            </p>

            <ul className={styles.heroBenefits}>
              <li>
                <CheckIcon />
                <span>
                  <strong>Large-tree specialists</strong>
                  Palms, gums, pines and complex removals.
                </span>
              </li>
              <li>
                <CheckIcon />
                <span>
                  <strong>Grapple saw crane</strong>
                  Faster, controlled removal with less disruption.
                </span>
              </li>
              <li>
                <CheckIcon />
                <span>
                  <strong>Your property protected</strong>
                  Less impact on lawns, fences and landscaping.
                </span>
              </li>
              <li>
                <CheckIcon />
                <span>
                  <strong>Insured, certified team</strong>
                  Local arborists with $2 million cover.
                </span>
              </li>
            </ul>

            <a className={styles.mobileCta} href="#free-site-visit">
              Book my free site visit
            </a>

            <div className={styles.reviewSummary}>
              <div className={styles.googleBrand}>
                <Image
                  src="/google-review.png"
                  width={97}
                  height={30}
                  alt="Reviews posted on Google"
                />
              </div>
              <div className={styles.reviewScore}>
                <strong>5.0</strong>
                <span>
                  <Stars />
                  <small>Excellent rating</small>
                </span>
              </div>
              <div className={styles.reviewLocal}>
                <strong>
                  <i aria-hidden="true">✓</i> Trusted across Tauranga
                </strong>
                <span>Real feedback from local tree-removal customers</span>
              </div>
            </div>
          </div>

          <div className={styles.formColumn} id="free-site-visit">
            <TreeRemovalQuoteForm />
          </div>
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="Why choose Tree Scene">
        <div className={styles.trustInner}>
          {trustPoints.map((point) => (
            <div key={point}>
              <CheckIcon dark />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.craneSection}>
        <div className={styles.twoColumn}>
          <div className={styles.imageFrame}>
            <Image
              src={craneImage}
              alt="Tree Scene grapple saw crane truck removing a palm tree in Tauranga"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className={styles.imageBadge}>
              <strong>Up to 20m reach</strong>
              <span>Controlled cutting & lifting</span>
            </div>
          </div>
          <div className={styles.sectionCopy}>
            <span className={styles.kicker}>The grapple saw advantage</span>
            <h2>Big trees removed with more control and less disruption</h2>
            <p>
              Traditional removal can mean repeated climbing, rigging and
              lowering. Our 4×4 grapple saw crane grips each section before it
              cuts, then lifts it to a controlled landing area.
            </p>
            <div className={styles.advantageGrid}>
              <div>
                <strong>Faster, cost-effective work</strong>
                <span>
                  Large sections can be handled in fewer cuts, often completing
                  suitable jobs in around half the time.
                </span>
              </div>
              <div>
                <strong>Less property impact</strong>
                <span>
                  Reduced free-falling debris helps protect lawns, fences,
                  driveways and gardens.
                </span>
              </div>
              <div>
                <strong>Safer complex removals</strong>
                <span>
                  Precise cutting and lifting helps manage trees close to homes
                  and other structures.
                </span>
              </div>
              <div>
                <strong>Cleaner site</strong>
                <span>
                  Material can be moved directly toward the chipper or truck,
                  reducing mess and handling.
                </span>
              </div>
            </div>
            <a className={styles.textLink} href="#free-site-visit">
              Get a free site assessment <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.speciesSection}>
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Local tree knowledge</span>
          <h2>Tree species we commonly remove in Tauranga</h2>
          <p>
            Whether it is one problem palm or a mature tree over a home, we can
            assess the safest and most cost-effective removal method.
          </p>
        </div>
        <div className={styles.speciesGrid}>
          {treeTypes.map(([name, description], index) => (
            <article key={name}>
              <span className={styles.speciesNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.councilNote}>
          <strong>Not sure if your tree is protected?</strong> Some notable
          trees, consent notices and covenants restrict removal. We can flag
          likely council considerations during your free site visit.
        </p>
      </section>

      <section className={styles.processSection}>
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Simple from start to finish</span>
          <h2>Your tree removed in three clear steps</h2>
        </div>
        <div className={styles.processGrid}>
          <article>
            <span>01</span>
            <h3>Book a free visit</h3>
            <p>
              Tell us about the tree. We visit the property, check access and
              risk, and give you honest advice.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Approve your fixed quote</h3>
            <p>
              You get clear scope and pricing before work begins—no pressure or
              surprise charges.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>We remove and tidy</h3>
            <p>
              Our experienced crew completes the work and leaves your property
              clean, tidy and safe.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.proofImage}>
          <Image
            src={arboristImage}
            alt="Certified Tree Scene arborist removing a tall palm tree"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
        <div className={styles.proofCopy}>
          <span className={styles.kicker}>Real local feedback</span>
          <h2>Trusted for the jobs that feel too big or too close</h2>
          <div className={styles.reviews}>
            {reviews.map((review) => (
              <blockquote key={review.text}>
                <Stars />
                <p>“{review.text}”</p>
                <cite>{review.name} · Google review</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.areasSection}>
        <span className={styles.kicker}>Proudly local</span>
        <h2>Tree removal across Tauranga and nearby areas</h2>
        <p>
          Tauranga · Mount Maunganui · Papamoa · Welcome Bay · Pyes Pa ·
          Bethlehem · Otūmoetai · Te Puna · Pāpāmoa Hills · Ōmokoroa and
          surrounding BOP areas
        </p>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.sectionHeading}>
          <span className={styles.kicker}>Questions, answered</span>
          <h2>Tree removal FAQs</h2>
        </div>
        <div className={styles.faqList}>
          <details>
            <summary>How much does tree removal cost in Tauranga?</summary>
            <p>
              The price depends on size, condition, access and what surrounds
              the tree. A small, open-site removal is very different from a
              mature tree over a home. Our site visit is free, and you receive a
              clear quote before deciding.
            </p>
          </details>
          <details>
            <summary>Can you remove a large tree close to my house?</summary>
            <p>
              Yes. Large and complex trees are our specialty. Where access and
              site conditions allow, our grapple saw crane holds and lifts
              sections rather than letting them fall freely.
            </p>
          </details>
          <details>
            <summary>Will heavy equipment damage my lawn?</summary>
            <p>
              We assess access and ground conditions before recommending a
              method. The crane can lift sections over sensitive areas, reducing
              repeated dragging and impact. We will explain any access risks
              before work begins.
            </p>
          </details>
          <details>
            <summary>Do you remove the branches and clean up?</summary>
            <p>
              Yes. Your quote clearly sets out chipping, removal and stump work
              if required. We finish by leaving the agreed work area clean, tidy
              and safe.
            </p>
          </details>
          <details>
            <summary>Do I need council permission?</summary>
            <p>
              Some protected or notable trees require resource consent, and a
              covenant or consent notice may also apply. We can flag likely
              issues, but property owners should confirm requirements with
              Tauranga City Council or their LIM before protected-tree work.
            </p>
          </details>
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div>
          <span className={styles.kicker}>No pressure. No obligation.</span>
          <h2>Start with a free tree removal site visit</h2>
          <p>
            Get expert advice, a safe removal plan and clear pricing for your
            Tauranga property.
          </p>
        </div>
        <a href="#free-site-visit">Book my free site visit</a>
      </section>

      <footer className={styles.footer}>
        <Image src="/logo.png" width={147} height={49} alt="Tree Scene Tauranga" />
        <div>
          <a href="tel:+64212420305">021 242 0305</a>
          <a href="mailto:admin@treescene.co.nz">admin@treescene.co.nz</a>
          <span>79A Hastings Road, Pyes Pa, Tauranga 3112</span>
        </div>
      </footer>

      <a className={styles.stickyMobileCta} href="#free-site-visit">
        Get free site visit
      </a>
    </main>
  );
}
