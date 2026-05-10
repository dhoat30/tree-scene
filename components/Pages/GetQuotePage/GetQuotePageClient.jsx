"use client";
import dynamic from "next/dynamic";

const GetQuotePage = dynamic(
  () => import("./GetQuotePage"),
  { ssr: false }
);

export default function GetQuotePageClient(props) {
  return <GetQuotePage {...props} />;
}
