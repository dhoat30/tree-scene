"use client";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Link from "next/link";

export default function Copyright() {
  return (
    <CopyrightBar>
      <Container maxWidth="xl" className="copyright-content">
        <div className="copyright-credit">
          <span>© {new Date().getFullYear()} Tree Scene. All rights reserved.</span>
          <a href="https://webduel.co.nz" rel="nofollow noopener noreferrer" target="_blank">Designed & Developed by web<strong>duel</strong></a>
        </div>
        <nav aria-label="Legal information" className="policy-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
        </nav>
      </Container>
    </CopyrightBar>
  );
}

const CopyrightBar = styled.div`
  padding: 20px 0;
  background: var(--light-primary-fixed-dim);
  color: var(--light-on-primary-container);
  font-size: .75rem;
  line-height: 1.6;

  .copyright-content, .copyright-credit, .policy-links { display: flex; align-items: center; flex-wrap: wrap; gap: 12px 24px; }
  .copyright-content { justify-content: space-between; }
  a { color: var(--light-on-primary-container); }
  a:hover { text-decoration: underline; text-underline-offset: 4px; }
  strong { font-weight: 600; }

  @media (max-width: 750px) {
    .copyright-content { align-items: flex-start; flex-direction: column; gap: 16px; }
    .copyright-credit { flex-direction: column; align-items: flex-start; gap: 6px; }
  }
`;
