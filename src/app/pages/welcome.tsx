"use client";
/**
 * This is a minimal welcome page for the starter.
 *
 * _Feel free to delete this file_
 **/

import { useState } from "react";

export const Welcome = () => {
  return (
    <div className="mx-auto min-h-screen max-w-[1100px] bg-beige px-8 py-20 font-noto text-ink">
      <header className="mb-16">
        <h1 className="m-0 font-playfair text-[4rem] leading-[0.9] font-bold">
          Welcome to RedwoodSDK
        </h1>
        <p className="mt-3 font-noto text-[1.625rem]">
          You’ve just installed the starter project. Here’s what to do next.
        </p>
      </header>

      <main>
        <section className="mb-16">
          <h2 className="mb-4 font-playfair text-[2.5rem] font-bold">
            Next steps
          </h2>
          <ol className="list-inside list-decimal p-0 text-xl leading-[1.6]">
            <li>
              Read the{" "}
              <a
                href="https://docs.rwsdk.com/getting-started/quick-start/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-orange no-underline hover:text-orange-light"
              >
                Quick Start
              </a>{" "}
              to learn the basics.
            </li>
            <li>
              Explore React Server Components and Server Functions in the{" "}
              <a
                href="https://docs.rwsdk.com/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-orange no-underline hover:text-orange-light"
              >
                Docs
              </a>
              .
            </li>
            <li>
              Join the community to ask questions and share what you’re
              building.
            </li>
          </ol>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-playfair text-[2.5rem] font-bold">
            Deploy to Cloudflare
          </h2>
          <p>
            RedwoodSDK runs on Cloudflare Workers. Here’s the quickest way to
            deploy.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-code p-4 font-mono text-xl text-orange-light">
            <span className="text-orange">$</span>
            <code className="grow">pnpm release</code>
            <Copy textToCopy="pnpm release" />
          </div>
          <p>
            Need more detail? Read the{" "}
            <a
              href="https://docs.rwsdk.com/core/hosting/"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-orange no-underline hover:text-orange-light"
            >
              Cloudflare deployment guide
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

const Copy = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer rounded border-0 bg-transparent px-3 py-1 text-base font-bold text-orange-light hover:bg-white/10"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};
